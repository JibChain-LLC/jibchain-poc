import 'server-only';

import { cookies } from 'next/headers';
import { db } from '#/db';
import { organizations, roles } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import { authProcedure } from '#/trpc/init';
import { createOrgInput } from '#/trpc/schemas';

export const createOrg = authProcedure
  .input(createOrgInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const {
      name,
      addressLines,
      locality,
      administrativeArea,
      postalCode,
      countryCode,
      category
    } = opts.input;

    const cookieStore = await cookies();

    const orgId = await db.transaction(async (tx) => {
      const [org] = await tx
        .insert(organizations)
        .values({
          name,
          category,
          ownerId: user.id,
          addressLines,
          locality,
          administrativeArea,
          postalCode,
          countryCode
        })
        .returning({ orgId: organizations.id });

      await tx
        .insert(roles)
        .values({ orgId: org.orgId, userId: user.id, role: RoleEnum.OWNER });

      return org.orgId;
    });

    cookieStore.set('current-org', orgId);
    return { ok: true, status: 200 };
  });

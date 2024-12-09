import { cookies } from 'next/headers';
import { db } from '#/db';
import { organizations, RoleEnum, roles } from '#/db/schema';
import { authProcedure } from '#/trpc/init';
import { createOrgInput } from '../../schemas';

export const createOrg = authProcedure
  .input(createOrgInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const { name } = opts.input;

    const cookieStore = await cookies();

    const orgId = await db.transaction(async (tx) => {
      const [org] = await tx
        .insert(organizations)
        .values({ name, ownerId: user.id })
        .returning({ orgId: organizations.id });

      await tx
        .insert(roles)
        .values({ orgId: org.orgId, userId: user.id, role: RoleEnum.OWNER });

      return org.orgId;
    });

    cookieStore.set('current-org', orgId);
    return { ok: true, status: 200 };
  });

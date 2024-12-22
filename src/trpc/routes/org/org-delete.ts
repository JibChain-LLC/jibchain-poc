import { eq } from 'drizzle-orm';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { db } from '#/db';
import { organizations } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';

export const deleteOrg = authProcedure
  .input(z.string().uuid())
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const orgId = opts.input;

    const cookieStore = await cookies();
    const currentOrg = cookieStore.get('current-org')?.value;

    const auth = await authCheck({
      user,
      orgId,
      rolesNeeded: [RoleEnum.OWNER]
    });
    if (!auth.ok) return auth;

    const [deleted] = await db
      .delete(organizations)
      .where(eq(organizations.id, orgId))
      .returning({ deletedId: organizations.id });

    if (deleted.deletedId === currentOrg) {
      cookieStore.delete('current-org');
    }

    return deleted;
  });

import 'server-only';

import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { users } from '#/db/auth-schema';
import { invites, roles } from '#/db/schema';
import { RoleEnum } from '#/enums';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';
import { createInviteInput } from '../../schemas';

export const createInvite = authProcedure
  .input(createInviteInput)
  .mutation(async (opts) => {
    const { user: u } = opts.ctx;
    const { orgId, emailAddress, role } = opts.input;

    const auth = await authCheck({
      user: u,
      orgId,
      rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
    });

    if (!auth.ok)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: auth.message
      });
    const user = auth.data.user;

    if (user.email === emailAddress)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Cannot invite self'
      });

    const isAlreadyInvited =
      (await db.$count(
        invites,
        and(eq(invites.orgId, orgId), eq(invites.email, emailAddress))
      )) > 0;

    if (isAlreadyInvited)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'User already has a pending invite'
      });

    const [existingUser] = await db
      .select()
      .from(users)
      .where(eq(users.email, emailAddress));

    if (existingUser) {
      const isInOrg =
        (await db.$count(
          roles,
          and(eq(roles.orgId, orgId), eq(roles.userId, existingUser.id))
        )) > 0;

      if (isInOrg)
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User is already a member  of organization'
        });
    }

    const [invite] = await db
      .insert(invites)
      .values({
        email: emailAddress,
        inviterId: user.id,
        existingUser: existingUser ? existingUser.id : null,
        role,
        orgId
      })
      .returning({ id: invites.id, email: invites.email });

    return invite;
  });

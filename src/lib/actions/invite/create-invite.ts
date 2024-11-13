'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { users } from '#/db/auth-schema';
import { RoleEnum, invites, roles } from '#/db/schema';
import { InviteSchema } from '../../schema/invite-user';
import authCheck from '../shared/auth-check';
import { ActionRes } from '../types';

type InviteUserOpts = InviteSchema & { orgId: string };

type InviteRecord = Pick<typeof invites.$inferSelect, 'email' | 'id'>;

/**
 * Create invite to be sent to given email
 *
 * If user is already in the database a foreign key is referenced to the existing user.
 */
export default async function inviteUser(
  opts: InviteUserOpts
): Promise<ActionRes<InviteRecord>> {
  const { email, role, orgId } = opts;

  const auth = await authCheck({
    orgId,
    rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
  });

  if (!auth.ok) return auth;
  const user = auth.data!.user;

  if (user.email === email)
    return {
      ok: false,
      status: 400,
      message: 'Cannot invite yourself to an organization'
    };

  const isAlreadyInvited =
    (await db.$count(
      invites,
      and(eq(invites.orgId, orgId), eq(invites.email, email))
    )) > 0;

  if (isAlreadyInvited)
    return {
      ok: false,
      status: 400,
      message: 'User already has a pending invite.'
    };

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser) {
    const isInOrg =
      (await db.$count(
        roles,
        and(eq(roles.orgId, orgId), eq(roles.userId, existingUser.id))
      )) > 0;

    if (isInOrg)
      return {
        ok: false,
        status: 400,
        message: 'User is already a member of organization'
      };
  }

  const [invite] = await db
    .insert(invites)
    .values({
      email,
      inviterId: user.id,
      existingUser: existingUser ? existingUser.id : null,
      role,
      orgId
    })
    .returning({ id: invites.id, email: invites.email });

  return { ok: true, status: 200, data: invite };
}

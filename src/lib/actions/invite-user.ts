'use server';

import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { RoleEnum, invites, roles } from '#/db/schema';
import { InviteSchema } from '../schema/invite-user';
import { createClient } from '../supabase/server';

interface DoesUserHaveRoleOpts {
  orgId: string;
  userId: string;
  role: RoleEnum | RoleEnum[];
}

async function doesUserHaveRole(opts: DoesUserHaveRoleOpts): Promise<boolean> {
  const { orgId, userId, role: r } = opts;

  const userRoles = await db
    .select({ role: roles.role })
    .from(roles)
    .where(and(eq(roles.orgId, orgId), eq(roles.userId, userId)));

  const role = Array.isArray(r) ? r : [r];
  return userRoles.some((r) => role.includes(r.role));
}

export default async function inviteUser(
  data: InviteSchema & { orgId: string }
) {
  const { email, role, orgId } = data;

  const supabase = await createClient();
  const {
    error,
    data: { user }
  } = await supabase.auth.getUser();

  if (error || !user) return { ok: false };

  const hasPerm = await doesUserHaveRole({
    orgId,
    userId: user.id,
    role: [RoleEnum.ADMIN, RoleEnum.OWNER]
  });
  if (!hasPerm)
    return {
      ok: false,
      message: 'User does not have permission to invite users into organization'
    };

  // check if user  is in account
  // const c = await db.$count(roles, and(eq(roles.orgId, orgId)));
  // if (c > 0)
  //   return { ok: false, message: 'User is already member of organization' };

  // find if user already exist

  // create invite entry
  const [invite] = await db
    .insert(invites)
    .values({
      email,
      inviterId: user.id,
      role,
      orgId
    })
    .returning({ inviteId: invites.id });

  return { ok: true, message: 'User successfully invited', invite };
}

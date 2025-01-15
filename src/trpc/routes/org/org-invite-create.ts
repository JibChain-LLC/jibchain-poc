import 'server-only';

import { TRPCError } from '@trpc/server';
import { and, eq } from 'drizzle-orm';
import { db } from '#/db';
import { users } from '#/db/schema/auth';
import { invites, roles } from '#/db/schema/public';
import { RoleEnum } from '#/enums';
import sendEmail from '#/lib/server/send-email';
import authCheck from '#/lib/server/shared/auth-check';
import { authProcedure } from '#/trpc/init';
import { createInviteInput } from '../../schemas';

export const createInvite = authProcedure
  .input(createInviteInput)
  .mutation(async (opts) => {
    const { user } = opts.ctx;
    const { orgId, email: emailAddress, role } = opts.input;
    const headers = opts.ctx.req?.headers;

    if (user.email === emailAddress)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Cannot invite self'
      });

    const auth = await authCheck({
      user,
      orgId,
      rolesNeeded: [RoleEnum.ADMIN, RoleEnum.OWNER]
    });

    if (!auth.ok)
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: auth.message
      });

    const org = await db.query.organizations.findFirst({
      columns: { name: true },
      where: (o, { eq }) => eq(o.id, orgId)
    });

    if (!org)
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Organization does not exist'
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

    const reqOrigin = headers?.get('origin') ?? 'https://app.coeusrisk.ai';
    const inviteURL = new URL('/join', reqOrigin);
    inviteURL.searchParams.set('inviteId', invite.id);

    const sentEmail = await sendEmail({
      to: [invite.email],
      subject: "You've been invited!",
      html: `
        <h1>You've been invited to join ${org.name}</h1>
        <p>Dear ${invite.email},<br/>You have been invited to join an organization by ${user.email}.</p>
        <a disable-tracking=true href="${inviteURL.toString()}">Click here to join</a>`.trim()
    });

    console.log('INVITE SENT STATUS:', sentEmail);

    return invite;
  });

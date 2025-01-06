import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { profiles } from '#/db/schema/public';
import { authProcedure } from '#/trpc/init';
import { updateUserInput } from '#/trpc/schemas';

export const updateUser = authProcedure
  .input(updateUserInput)
  .query(async (opts) => {
    const { email, ...rest } = opts.input;
    const user = opts.ctx.user;

    await db.update(profiles).set(rest).where(eq(profiles.id, user.id));

    if (email) {
    }

    return { ok: true };
  });

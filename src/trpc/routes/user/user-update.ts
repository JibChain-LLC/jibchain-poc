import { eq } from 'drizzle-orm';
import { db } from '#/db';
import { profiles } from '#/db/schema/public';
import { authProcedure } from '#/trpc/init';
import { updateUserInput } from '#/trpc/schemas';

export const updateUser = authProcedure
  .input(updateUserInput)
  .mutation(async (opts) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...rest } = opts.input;
    const user = opts.ctx.user;

    await db.update(profiles).set(rest).where(eq(profiles.id, user.id));

    return { ok: true };
  });

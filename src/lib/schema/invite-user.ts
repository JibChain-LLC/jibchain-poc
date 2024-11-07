import { z } from 'zod';
import { RoleEnum } from '#/db/schema';

const inviteFormSchema = z.object({
  email: z.string(),
  role: z.nativeEnum(RoleEnum)
});

export type InviteSchema = z.infer<typeof inviteFormSchema>;
export default inviteFormSchema;

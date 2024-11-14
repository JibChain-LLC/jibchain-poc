import { z } from 'zod';

const loginFormSchema = z.object({
  email: z.string().email('This is not a valid email'),
  password: z.string().min(5).max(25)
});

export type UserLoginSchema = z.infer<typeof loginFormSchema>;
export default loginFormSchema;

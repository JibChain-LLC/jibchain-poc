import { z } from 'zod';

const signUpFormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email('This is not a valid email'),
    password: z.string().min(5).max(25),
    passwordAgain: z.string().min(5).max(25)
  })
  .refine((v) => v.password === v.passwordAgain, 'Passwords must match');

export type UserSignUpSchema = z.infer<typeof signUpFormSchema>;
export default signUpFormSchema;

import { z } from 'zod';

const signUpFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    jobRole: z.string().min(1, { message: 'Job role is required' }),
    email: z
      .string({ required_error: 'Email address is required' })
      .email('This is not a valid email'),
    password: z.string().min(10).max(25),
    confirmPassword: z.string().min(10).max(25)
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword']
  });

export type UserSignUpSchema = z.infer<typeof signUpFormSchema>;
export default signUpFormSchema;

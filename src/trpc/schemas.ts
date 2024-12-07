import { z } from 'zod';
import { RoleEnum } from '#/db/schema';

export const createInviteInput = z.object({
  orgId: z.string().uuid(),
  emailAddress: z.string().email(),
  role: z.nativeEnum(RoleEnum)
});

export const signUpInput = z
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

export const createOrgInput = z.object({
  name: z.string()
});

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string()
});

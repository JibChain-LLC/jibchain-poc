import { z } from 'zod';
import type { invites, organizations } from '#/db/schema';
import { RoleEnum } from '#/enums';

type OrgInsertSchema = z.ZodSchema<
  Required<
    Omit<typeof organizations.$inferInsert, 'ownerId' | 'dateCreated' | 'id'>
  >
>;

type OrgUpdateSchema = z.ZodSchema<
  Partial<
    Omit<typeof organizations.$inferInsert, 'ownerId' | 'dateCreated' | 'id'>
  >
>;

type InviteInsertSchema = z.ZodSchema<
  Required<
    Omit<typeof invites.$inferInsert, 'id' | 'inviterId' | 'existingUser'>
  >
>;

export const createInviteInput = z.object({
  orgId: z.string().uuid(),
  email: z.string().email(),
  role: z.nativeEnum(RoleEnum)
}) satisfies InviteInsertSchema;

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
  name: z.string(),
  addressLines: z.string().min(1).array().min(1),
  locality: z.string().min(1, 'City is required'),
  administrativeArea: z.string(),
  postalCode: z.string(),
  countryCode: z.string().length(2)
}) satisfies OrgInsertSchema;

export const updateOrgInput =
  createOrgInput.partial() satisfies Partial<OrgUpdateSchema>;

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string()
});

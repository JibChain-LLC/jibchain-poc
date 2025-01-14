import { z } from 'zod';
import type { invites, organizations, profiles } from '#/db/schema/public';
import { IndustryEnum, RoleEnum } from '#/enums';

type OrgInsertSchema = z.ZodSchema<
  Required<
    Omit<typeof organizations.$inferInsert, 'ownerId' | 'dateCreated' | 'id'>
  >
>;

type OrgUpdateSchema = z.ZodSchema<
  Partial<
    Omit<typeof organizations.$inferInsert, 'ownerId' | 'dateCreated' | 'id'>
  > & { id: string }
>;

type InviteInsertSchema = z.ZodSchema<
  Required<
    Omit<typeof invites.$inferInsert, 'id' | 'inviterId' | 'existingUser'>
  >
>;

type UpdateUserSchema = z.ZodSchema<
  Omit<typeof profiles.$inferInsert, 'id' | 'isSuperUser'>
>;

export const createInviteInput = z.object({
  orgId: z.string().uuid(),
  email: z.string().email(),
  role: z
    .nativeEnum(RoleEnum)
    .refine((v) => v !== RoleEnum.OWNER, 'Invite cannot be set to Owner')
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
  name: z.string().min(1, 'Organization name is required'),
  category: z.nativeEnum(IndustryEnum),
  addressLines: z.string().min(1, 'Address is required').array().min(1),
  locality: z.string().min(1, 'City is required'),
  administrativeArea: z.string().min(1, 'State/Province is required'),
  postalCode: z.string().min(1, 'Zip Code is required'),
  countryCode: z
    .string()
    .min(1, 'Country is required')
    .length(2, 'Country must be two letter code (eg. US)')
}) satisfies OrgInsertSchema;

export const updateOrgInput = createOrgInput
  .partial()
  .strict()
  .extend({ id: z.string().uuid() }) satisfies Partial<OrgUpdateSchema>;

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string()
});

export const updateUserInput = z.object({
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  jobRole: z.string().optional()
}) satisfies UpdateUserSchema;

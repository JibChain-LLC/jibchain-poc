import { jsonb, pgSchema, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey(),
  email: varchar('email'),
  lastSignIn: timestamp('last_sign_in_at'),
  userMetadata: jsonb('raw_user_meta_data').$type<{
    jobRole: string;
    firstName: string;
    lastName: string;
  }>()
});

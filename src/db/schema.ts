import 'server-only';

import { sql } from 'drizzle-orm';
import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';
import { RoleEnum } from '#/enums';
import { users } from './auth-schema';

export const roleEnum = pgEnum(
  'role_enums',
  Object.values(RoleEnum) as [RoleEnum, ...RoleEnum[]]
);

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 256 }).notNull(),
  ownerId: uuid('owner_id')
    .references(() => users.id, {
      onDelete: 'set null'
    })
    .notNull(),
  addressLines: text('address_lines').array(),
  locality: text('locality'),
  administrativeArea: text('administrative_area'),
  postalCode: text('postal_code'),
  countryCode: varchar('country_code', { length: 2 }),
  dateCreated: timestamp('date_created')
    .default(sql`now()`)
    .notNull()
});

export const roles = pgTable('roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  orgId: uuid('org_id')
    .notNull()
    .references(() => organizations.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  active: boolean('active').default(true).notNull(),
  role: roleEnum().default(RoleEnum.USER).notNull()
});

export const invites = pgTable('invites', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email').notNull(),
  existingUser: uuid('existing_user').references(() => users.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  orgId: uuid('org_id')
    .notNull()
    .references(() => organizations.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  inviterId: uuid('inviter_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  role: roleEnum().default(RoleEnum.USER).notNull()
});

export const summaries = pgTable('summaries', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  source: varchar('source').notNull(),
  summary: text('text_summary').notNull(),
  link: varchar('link').notNull(),
  modelUsed: varchar('model_used')
});
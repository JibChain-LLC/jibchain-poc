import { boolean, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';

export const suppliers = pgTable('suppliers', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name'),
  address: varchar(),
  city: varchar('city'),
  state: varchar('state'),
  postalCode: varchar('postal_code'),
  country: varchar('country').notNull()
});

export const classifications = pgTable('classifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title').notNull(),
  source: varchar('source').notNull(),
  summary: text('text_summary').notNull(),
  link: varchar('link').notNull(),
  modelUsed: varchar('model_used'),
  humanVerified: boolean('human_verified').default(false)
});

export const classifyRelations = pgTable('classify_relations', {
  id: uuid('id'),
  supplierId: uuid('supplier_id'),
  classificationId: uuid('classification_id')
});

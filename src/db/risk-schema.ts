import { sql, SQL } from 'drizzle-orm';
import {
  boolean,
  geometry,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core';
import { RiskCategoryEnum, RiskLevelEnum } from '#/enums';
import { organizations } from './schema';

const risksSchema = pgSchema('risks');

export const industryEnum = risksSchema.enum('industry_enums', []);

export const riskLevelEnum = risksSchema.enum(
  'risk_level_enums',
  Object.values(RiskLevelEnum) as [RiskLevelEnum, ...RiskLevelEnum[]]
);

export const riskCategoryEnum = risksSchema.enum(
  'risk_category_enums',
  Object.values(RiskCategoryEnum) as [RiskCategoryEnum, ...RiskCategoryEnum[]]
);

export const risks = risksSchema.table('risk_entries', {
  id: uuid().primaryKey().defaultRandom(),
  category: riskCategoryEnum().notNull(),
  title: text().notNull(),
  summary: text().notNull(),
  url: text().unique().notNull(),
  source: text(),
  image: text('image_url'),
  articleDate: timestamp('article_date'),
  mitigation: text(),
  justification: text(),
  created: timestamp('created_at').defaultNow().notNull(),
  updated: timestamp('updated_at')
    .generatedAlwaysAs((): SQL => sql`now()`)
    .notNull(),
  verified: boolean().default(false)
});

export const suppliers = risksSchema.table('suppliers', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  category: industryEnum().notNull(),
  addressLines: text('address_lines').array(),
  locality: text('locality'),
  administrativeArea: text('administrative_area'),
  postalCode: text('postal_code'),
  countryCode: varchar('country_code', { length: 2 }),
  regions: varchar('regions', { length: 2 }).array(),
  coord: geometry('coord', { type: 'point', mode: 'tuple', srid: 4326 }),
  email: text(),
  phone: text()
});

export const affectedSuppliers = risksSchema.table('affected_suppliers', {
  id: uuid().primaryKey().defaultRandom(),
  supplierId: uuid('supplier_id')
    .notNull()
    .references(() => suppliers.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  riskId: uuid('risk_id')
    .notNull()
    .references(() => risks.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  exposure: riskLevelEnum().notNull()
});

export const impactToOperation = risksSchema.table('impact_to_operations', {
  id: uuid().primaryKey().defaultRandom(),
  orgId: uuid('org_id')
    .notNull()
    .references(() => organizations.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  supplierId: uuid('supplier_id')
    .notNull()
    .references(() => suppliers.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  riskId: uuid('risk_id')
    .notNull()
    .references(() => risks.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),
  impact: riskLevelEnum().notNull()
});

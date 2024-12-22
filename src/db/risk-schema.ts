import { sql, SQL } from 'drizzle-orm';
import {
  boolean,
  geometry,
  pgSchema,
  text,
  timestamp,
  uuid,
  varchar,
  real,
  smallint,
  bigint
} from 'drizzle-orm/pg-core';
import {
  IndustryEnum,
  RegionEnum,
  RiskCategoryEnum,
  RiskLevelEnum,
  ScenarioLevelEnum
} from '#/enums';

const risksSchema = pgSchema('risks');

export const industryEnum = risksSchema.enum(
  'industry_enums',
  Object.values(IndustryEnum) as [IndustryEnum, ...IndustryEnum[]]
);

export const riskLevelEnum = risksSchema.enum(
  'risk_level_enums',
  Object.values(RiskLevelEnum) as [RiskLevelEnum, ...RiskLevelEnum[]]
);

export const riskCategoryEnum = risksSchema.enum(
  'risk_category_enums',
  Object.values(RiskCategoryEnum) as [RiskCategoryEnum, ...RiskCategoryEnum[]]
);

export const regionEnums = risksSchema.enum(
  'region_enums',
  Object.keys(RegionEnum) as [
    keyof typeof RegionEnum,
    ...(keyof typeof RegionEnum)[]
  ]
);

export const scenarioEnums = risksSchema.enum(
  'scenario_level_enums',
  Object.values(ScenarioLevelEnum) as [
    ScenarioLevelEnum,
    ...ScenarioLevelEnum[]
  ]
);

export const risks = risksSchema.table('risk_entries', {
  id: uuid().primaryKey().defaultRandom(),
  title: text(),
  url: text().unique(),
  source: text(),
  image: text('image_url'),
  articleDate: timestamp('article_date'),
  category: riskCategoryEnum(),
  finanicalImpat: bigint('financial_impact', { mode: 'number' }),
  summary: text(),
  mitigation: text(),
  justification: text(),
  created: timestamp('created_at').defaultNow(),
  updated: timestamp('updated_at').generatedAlwaysAs((): SQL => sql`now()`),
  verified: boolean().default(false)
});

export const scenarioPlanning = risksSchema.table('scenario_planning', {
  id: uuid().primaryKey().defaultRandom(),
  riskId: uuid('risk_id').references(() => risks.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  level: scenarioEnums(),
  confidence: real(),
  implementationTime: smallint('implementation_time'),
  cost: bigint({ mode: 'number' }),
  scenario: text(),
  strategy: text('mitigation_strategy')
});

export const suppliers = risksSchema.table('suppliers', {
  id: uuid().primaryKey().defaultRandom(),
  name: text(),
  category: industryEnum(),
  addressLines: text('address_lines').array(),
  locality: text('locality'),
  administrativeArea: text('administrative_area'),
  postalCode: text('postal_code'),
  countryCode: varchar('country_code', { length: 2 }),
  regions: regionEnums().array(),
  coord: geometry('coord', { type: 'point', mode: 'tuple', srid: 4326 }),
  contactName: text('contact_name'),
  email: text(),
  phone: text()
});

export const supplierExposure = risksSchema.table('supplier_exposure', {
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

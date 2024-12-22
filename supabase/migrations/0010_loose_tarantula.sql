CREATE TYPE "risks"."industry_enums" AS ENUM('Automotive Sector', 'Electronics and Technology', 'Healthcare and Pharmaceuticals', 'Retail and E-Commerce', 'Energy and Utilities', 'Defense and Aerospace', 'Construction and Infrastructure', 'Logistics and Transportation');--> statement-breakpoint
CREATE TYPE "risks"."region_enums" AS ENUM('AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA');--> statement-breakpoint
CREATE TYPE "risks"."risk_category_enums" AS ENUM('Cloud Service', 'Ransomware Attack', 'Internal Security Failures', 'Natural Disaster', 'Terrorism', 'Cybersecurity', 'Technology Failure', 'Public Health', 'Economic Downturn', 'Environmental', 'Supply Chain', 'Regulatory Changes', 'Political', 'Counterfeit Parts', 'SDLC Processes', 'Labor Strike');--> statement-breakpoint
CREATE TYPE "risks"."risk_level_enums" AS ENUM('low', 'med', 'hi');--> statement-breakpoint
CREATE TYPE "risks"."scenario_level_enums" AS ENUM('Aspirational', 'Exploratory', 'Remediation');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auth"."users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"email" varchar,
	"last_sign_in_at" timestamp,
	"raw_user_meta_data" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "risks"."risk_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text,
	"url" text,
	"source" text,
	"image_url" text,
	"article_date" timestamp,
	"risk_category" "risks"."risk_category_enums",
	"financial_impact" bigint,
	"summary" text,
	"mitigation" text,
	"justification" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"verified" boolean DEFAULT false,
	CONSTRAINT "risk_entries_url_unique" UNIQUE("url")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "risks"."scenario_planning" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"risk_id" uuid,
	"level" "risks"."scenario_level_enums",
	"confidence" real,
	"implementation_time" smallint,
	"cost" bigint,
	"scenario" text,
	"mitigation_strategy" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "risks"."supplier_exposure" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplier_id" uuid NOT NULL,
	"risk_id" uuid NOT NULL,
	"exposure" "risks"."risk_level_enums" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "risks"."suppliers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"category" "risks"."industry_enums",
	"address_lines" text[],
	"locality" text,
	"administrative_area" text,
	"postal_code" text,
	"country_code" varchar(2),
	"regions" "risks"."region_enums"[],
	"coord" geometry(point),
	"contact_name" text,
	"email" text,
	"phone" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "risks"."scenario_planning" ADD CONSTRAINT "scenario_planning_risk_id_risk_entries_id_fk" FOREIGN KEY ("risk_id") REFERENCES "risks"."risk_entries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "risks"."supplier_exposure" ADD CONSTRAINT "supplier_exposure_supplier_id_suppliers_id_fk" FOREIGN KEY ("supplier_id") REFERENCES "risks"."suppliers"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "risks"."supplier_exposure" ADD CONSTRAINT "supplier_exposure_risk_id_risk_entries_id_fk" FOREIGN KEY ("risk_id") REFERENCES "risks"."risk_entries"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

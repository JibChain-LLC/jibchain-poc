ALTER TABLE "risks"."risk_entries" ALTER COLUMN "risk_category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "risks"."risk_entries" ADD COLUMN IF NOT EXISTS "risk_level" "risks"."risk_level_enums";--> statement-breakpoint
ALTER TABLE "risks"."risk_entries" ADD COLUMN IF NOT EXISTS "probability" real;--> statement-breakpoint
ALTER TABLE "risks"."risk_entries" ADD COLUMN IF NOT EXISTS "model_used" text;--> statement-breakpoint
ALTER TABLE "risks"."risk_entries" ADD COLUMN IF NOT EXISTS "mapped_to_org" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "risks"."suppliers" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "risks"."industry_enums";--> statement-breakpoint
CREATE TYPE "risks"."industry_enums" AS ENUM('Automotive Sector', 'Electronics and Technology', 'Retail and E-Commerce', 'Energy and Utilities', 'Defense and Aerospace', 'Education', 'Government', 'Healthcare and Pharmaceuticals', 'Finance and Banking', 'Manufacturing', 'Telecommunications');--> statement-breakpoint
ALTER TABLE "risks"."suppliers" ALTER COLUMN "category" SET DATA TYPE "risks"."industry_enums" USING "category"::"risks"."industry_enums";--> statement-breakpoint
DROP TYPE "risks"."risk_category_enums";--> statement-breakpoint
CREATE TYPE "risks"."risk_category_enums" AS ENUM('Financial', 'Environmental', 'Cybersecurity', 'Ransomware', 'Data Breaches', 'Insider Threats', 'Third-Party Vendor Risk', 'Network Security', 'Compliance Risk', 'Phishing & Social Engineering', 'Brand & Reputation', 'Counterfeit Parts', 'Labor Practices/Human Rights', 'Field Issues');--> statement-breakpoint
ALTER TABLE "risks"."scenario_planning" ALTER COLUMN "level" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "risks"."scenario_level_enums";--> statement-breakpoint
CREATE TYPE "risks"."scenario_level_enums" AS ENUM('aspirational', 'exploratory', 'remediation');--> statement-breakpoint
ALTER TABLE "risks"."scenario_planning" ALTER COLUMN "level" SET DATA TYPE "risks"."scenario_level_enums" USING "level"::"risks"."scenario_level_enums";

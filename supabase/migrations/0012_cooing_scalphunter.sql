ALTER TABLE "risks"."risk_entries" ALTER COLUMN "risk_category" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "risks"."suppliers" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "risks"."industry_enums";--> statement-breakpoint
CREATE TYPE "risks"."industry_enums" AS ENUM('Automotive Sector', 'Electronics and Technology', 'Retail and E-Commerce', 'Energy and Utilities', 'Defense and Aerospace', 'Education', 'Government', 'Healthcare and Pharmaceuticals', 'Finance and Banking', 'Manufacturing', 'Telecommunications');--> statement-breakpoint
ALTER TABLE "risks"."suppliers" ALTER COLUMN "category" SET DATA TYPE "risks"."industry_enums" USING "category"::"risks"."industry_enums";--> statement-breakpoint
DROP TYPE "risks"."risk_category_enums";--> statement-breakpoint
CREATE TYPE "risks"."risk_category_enums" AS ENUM('Financial', 'Environmental', 'Cybersecurity', 'Ransomware', 'Data Breaches', 'Insider Threats', 'Third-Party Vendor Risk', 'Network Security', 'Compliance Risk', 'Phishing & Social Engineering', 'Brand & Reputation', 'Counterfeit Parts');
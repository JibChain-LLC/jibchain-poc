ALTER TABLE "risks"."risk_entries" ADD COLUMN "risk_level" "risks"."risk_level_enums";--> statement-breakpoint
ALTER TABLE "risks"."risk_entries" ADD COLUMN "probability" real;--> statement-breakpoint
ALTER TABLE "risks"."risk_entries" ADD COLUMN "orgMapped" boolean DEFAULT false;
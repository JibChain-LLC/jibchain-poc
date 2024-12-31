ALTER TABLE "risks"."scenario_planning" ALTER COLUMN "level" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "risks"."scenario_level_enums";--> statement-breakpoint
CREATE TYPE "risks"."scenario_level_enums" AS ENUM('aspirational', 'exploratory', 'remediation');--> statement-breakpoint
ALTER TABLE "risks"."scenario_planning" ALTER COLUMN "level" SET DATA TYPE "risks"."scenario_level_enums" USING "level"::"risks"."scenario_level_enums";
ALTER TYPE "public"."role_enums" ADD VALUE 'Editor' BEFORE 'User';--> statement-breakpoint
ALTER TABLE "summaries" ALTER COLUMN "source" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "summaries" ALTER COLUMN "text_summary" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "date_created" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "active" boolean DEFAULT true NOT NULL;
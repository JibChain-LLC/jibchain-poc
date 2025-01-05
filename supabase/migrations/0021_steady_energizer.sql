ALTER TABLE "organizations" ALTER COLUMN "address_lines" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "locality" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "administrative_area" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "postal_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "country_code" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "category" SET NOT NULL;
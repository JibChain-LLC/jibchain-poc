ALTER TABLE "organizations" DROP CONSTRAINT "organizations_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "organizations" ALTER COLUMN "owner_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "address_lines" text[];--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "locality" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "administrative_area" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "postal_code" text;--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "country_code" varchar(2);--> statement-breakpoint
ALTER TABLE "organizations" ADD COLUMN "regions" varchar(2)[];--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "organizations" ADD CONSTRAINT "organizations_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "auth"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

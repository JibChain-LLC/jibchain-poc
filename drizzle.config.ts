import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema',
  out: './supabase/migrations',
  schemaFilter: ['public', 'risks'],
  introspect: {
    casing: 'camel'
  },
  dbCredentials: {
    database: 'postgres',
    url: process.env.DATABASE_URL!
  },
  strict: true
});

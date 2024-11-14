import 'server-only';

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as authSchema from './auth-schema';
import * as schema from './schema';

const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL
});

// export const client = postgres(DATABASE_URL as string, { prepare: false });
export const db = drizzle({
  client: pool,
  schema: { ...schema, ...authSchema }
});

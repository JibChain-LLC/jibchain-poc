import 'server-only';

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as authSchema from './schema/auth';
import * as schema from './schema/public';
import * as risks from './schema/risks';

const { Pool } = pg;
const { DATABASE_URL } = process.env;

const pool = new Pool({
  connectionString: DATABASE_URL
});

// export const client = postgres(DATABASE_URL as string, { prepare: false });
export const db = drizzle({
  client: pool,
  schema: { ...schema, ...authSchema, ...risks }
});

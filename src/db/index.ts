import 'server-only';

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as authSchema from './auth-schema';
import * as schema from './schema';

const { DATABASE_URL } = process.env;

export const client = postgres(DATABASE_URL as string, { prepare: false });
export const db = drizzle({ client, schema: { ...schema, ...authSchema } });

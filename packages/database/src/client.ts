import { drizzle } from 'drizzle-orm/postgres-js';
import pg from 'postgres';

import { DATABASE_URL } from './config.js';
import * as db from './schema.js';

/**
 * Postgres client.
 */
export const postgres = pg(DATABASE_URL);

/**
 * Drizzle client.
 */
export const client = drizzle(postgres, {
    schema: db,
    logger: process.env.DATABASE_LOGGING === 'true',
});

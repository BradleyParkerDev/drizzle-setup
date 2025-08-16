import dotenv from 'dotenv';
import { drizzle as drizzleLocal } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import pg from 'pg';
import ws from 'ws';
import * as schema from './schemas';

// Load environment variables from .env into process.env
dotenv.config();

/**
 * Boolean flag indicating whether to use a Neon (serverless) database connection.
 * 
 * This is determined by the `USE_NEON` environment variable.
 */
const useNeon = process.env.USE_NEON === 'true';

/**
 * Returns a Drizzle ORM database client, either for Neon (serverless) or local PostgreSQL,
 * based on the value of the `USE_NEON` environment variable.
 *
 * @remarks
 * - Throws an error if the corresponding connection string environment variable is missing.
 * - Automatically sets up WebSocket support when using Neon.
 *
 * @example
 * ```ts
 * import { getDb } from './db';
 * const db = getDb();
 * ```
 *
 * @returns A Drizzle ORM database client configured with schema and logger.
 * 
 * @throws Will throw an error if the required database URL environment variable is not set.
 */
export const getDb = () => {
	let db;

	if (useNeon) {
		const neonConnectionString = process.env.NEON_DATABASE_URL;
		if (!neonConnectionString) {
			throw new Error('NEON_DATABASE_URL is not defined');
		}

		// Configure WebSocket constructor for Neon
		neonConfig.webSocketConstructor = ws;

		// Create a Neon connection pool and initialize Drizzle
		const pool = new NeonPool({ connectionString: neonConnectionString });
		db = drizzleNeon(pool, { schema, logger: true });
	} else {
		const localConnectionString = process.env.LOCAL_DATABASE_URL;
		if (!localConnectionString) {
			throw new Error('LOCAL_DATABASE_URL is not defined');
		}

		// Create a local PostgreSQL connection pool and initialize Drizzle
		const pool = new pg.Pool({ connectionString: localConnectionString });
		db = drizzleLocal(pool, { schema, logger: true });
	}

	return db;
};

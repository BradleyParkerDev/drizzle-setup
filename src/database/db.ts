import dotenv from 'dotenv';
import { drizzle as drizzleLocal } from 'drizzle-orm/node-postgres';
import { drizzle as drizzleNeon } from 'drizzle-orm/neon-serverless';
import { Pool as NeonPool, neonConfig } from '@neondatabase/serverless';
import pg from 'pg';
import ws from 'ws';
import * as schema from './schemas';

dotenv.config();

const useNeon = process.env.USE_NEON === 'true';

/**
 * Dynamically selects and returns the appropriate Drizzle ORM DB client
 * based on the USE_NEON environment variable.
 */
export const getDb = () => {
	let db;

	if (useNeon) {
		const neonConnectionString = process.env.NEON_DATABASE_URL;
		if (!neonConnectionString) {
			throw new Error('NEON_DATABASE_URL is not defined');
		}

		neonConfig.webSocketConstructor = ws;
		const pool = new NeonPool({ connectionString: neonConnectionString });
		db = drizzleNeon(pool, { schema, logger: true });
	} else {
		const localConnectionString = process.env.LOCAL_DATABASE_URL;
		if (!localConnectionString) {
			throw new Error('LOCAL_DATABASE_URL is not defined');
		}
		const pool = new pg.Pool({ connectionString: localConnectionString });
		db = drizzleLocal(pool, { schema, logger: true });
	}

	return db;
};

import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

// Load environment variables from .env into process.env
dotenv.config();

const { USE_NEON, NEON_DATABASE_URL, LOCAL_DATABASE_URL } = process.env;

/**
 * Determines the appropriate database connection string
 * based on the `USE_NEON` environment variable.
 *
 * @remarks
 * - If `USE_NEON` is `"true"`, it uses `NEON_DATABASE_URL`.
 * - Otherwise, it uses `LOCAL_DATABASE_URL`.
 *
 * @throws Will throw an error if the selected connection string is not defined.
 */
const connectionString =
	USE_NEON === 'true'
		? NEON_DATABASE_URL ?? (() => {
			throw new Error('USE_NEON is true but NEON_DATABASE_URL is not defined.');
		})()
		: LOCAL_DATABASE_URL ?? (() => {
			throw new Error('USE_NEON is false but LOCAL_DATABASE_URL is not defined.');
		})();

/**
 * Exports the Drizzle ORM configuration.
 *
 * @remarks
 * This configuration is used by the Drizzle CLI (drizzle-kit) to:
 * - Locate your schema
 * - Output migrations
 * - Set the database dialect (PostgreSQL)
 * - Provide the connection URL
 *
 * @see https://orm.drizzle.team/docs/overview
 */
export default defineConfig({
	schema: './src/database/schemas',
	out: './src/database/migrations',
	dialect: 'postgresql',
	dbCredentials: { url: connectionString },
	verbose: true,
	strict: true,
});

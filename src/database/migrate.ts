//////////////////////////////////////////////////////////////////
// Neon and Local Migrations
//////////////////////////////////////////////////////////////////

import { migrate as neonMigrate } from 'drizzle-orm/neon-serverless/migrator'; 
import { migrate as localMigrate } from 'drizzle-orm/node-postgres/migrator';
import { getDb } from './db';
import dotenv from 'dotenv';

// Load environment variables from .env into process.env
dotenv.config();

/**
 * Executes database migrations using Drizzle ORM.
 *
 * @remarks
 * This script automatically chooses between Neon (serverless) and local PostgreSQL
 * migrations based on the `USE_NEON` environment variable.
 *
 * The appropriate Drizzle migrator and database client are selected dynamically.
 * 
 * @example
 * ```bash
 * USE_NEON=true  node migrate.ts   # For NeonDB
 * USE_NEON=false node migrate.ts   # For local PostgreSQL
 * ```
 *
 * @throws Will exit the process with code 1 if migrations fail.
 */
const main = async () => {
	const useNeon = process.env.USE_NEON === 'true' || false;

	// Get the correct database connection
	const db = getDb();

	// Select the appropriate migrator
	const migrate = useNeon ? neonMigrate : localMigrate;

	try {
		// Run all pending migrations
		await migrate(db, { migrationsFolder: './src/database/migrations' });
		console.log('✅ Migrations completed successfully');
	} catch (error) {
		console.error('❌ Error during migrations:', error);
		process.exit(1);
	}
};

// Run the migration logic when this file is executed directly
main();

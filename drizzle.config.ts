import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Explicit boolean conversion with fallback to false
const useNeon = process.env.USE_NEON === 'true' || false;

const neonUrl = process.env.NEON_DATABASE_URL;
const localUrl = process.env.LOCAL_DATABASE_URL;

let connectionString = '';

if (useNeon && neonUrl) {
	if (!neonUrl) {
		throw new Error('USE_NEON is true but NEON_DATABASE_URL is not defined.');
	}
	connectionString = neonUrl;
} else {
	if (!localUrl) {
		throw new Error('USE_NEON is false but LOCAL_DATABASE_URL is not defined.');
	}
	connectionString = localUrl;
}

// Export Drizzle configuration
export default defineConfig({
	schema: './src/database/schemas', // Path to your schema files
	out: './src/database/migrations', // Output folder for migrations
	dialect: 'postgresql', // Specify the database dialect
	dbCredentials: {
		url: connectionString, // Database connection string
	},
	verbose: true, // Enable detailed logs during migrations
	strict: true, // Enforce strict validation for migrations
});
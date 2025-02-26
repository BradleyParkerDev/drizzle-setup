declare namespace NodeJS {
	interface ProcessEnv {
		PORT: string;
		USE_NEON: string;
		NEON_DATABASE_URL: string;
		LOCAL_DATABASE_URL: string;
		// Add other environment variables here
	}
}
  
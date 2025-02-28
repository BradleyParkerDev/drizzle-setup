# Drizzle Setup

This is a TypeScript-based Drizzle ORM setup for working with PostgreSQL. It includes database schema management, migrations, and query execution using Drizzle ORM.

## Overview

This project is built with TypeScript and Drizzle ORM, designed to provide a clean and efficient way to manage database interactions. It includes essential configurations for:

- Database schema definition (using Drizzle ORM)
- Migrations & schema generation
- Database connections (local & remote using NeonDB)
- Type-safe SQL queries with PostgreSQL

## Features

- Drizzle ORM – A modern TypeScript ORM with type-safe SQL queries.
- PostgreSQL Support – Works with local and serverless databases like NeonDB.
- Migrations & Schema Generation – Easily manage database versions.
- TypeScript Support – Ensures type safety and clean database operations.

## Project Structure
```
drizzle-setup/
├── dist/                   # Output directory for compiled TypeScript files
├── node_modules/           # Installed npm packages
├── src/                    # Source directory containing all TypeScript code
│ ├── database/             # Database-related files
│ │ ├── migrations/         # Migration files for database changes
│ │ ├── schemas/            # Drizzle ORM schema definitions
│ │ ├── localDb.ts          # Configuration for local PostgreSQL database
│ │ ├── migrate.ts          # Script to run database migrations
│ │ └── neonDb.ts           # Configuration for NeonDB (serverless PostgreSQL)
│ └── types/                # TypeScript type definitions (if needed)
├── .gitignore              # Files to exclude from Git tracking
├── drizzle.config.ts       # Drizzle ORM configuration file
├── example.env             # Example environment variables file
├── package-lock.json       # Locks the versions of installed npm packages
├── package.json            # Defines project dependencies and npm scripts
├── README.md               # Project documentation
└── tsconfig.json           # TypeScript configuration file

```

## Getting Started

### Prerequisites

- Node.js (v22.13.1 or higher)
- npm (11.1.0 or higher)
- PostgreSQL (Local or Remote, e.g., NeonDB)

### Installation

1. **Clone the repository:**

    ```sh
    git clone https://github.com/BradleyParkerDev/drizzle-setup.git
    cd drizzle-setup
    ```

2. **Install dependencies:**

    ```sh
    npm install
    ```

3. **Set up your environment variables:**
    - Create a .env file in the root directory.

    - Add the following variables:

    ```env
    USE_NEON=false
    NEON_DATABASE_URL=postgresql://username:password@neonhost:5432/neon_db
    LOCAL_DATABASE_URL=postgresql://username:password@localhost:5432/local_db
    ```

4. **Generate the database schema using Drizzle:**

    ```sh
    npm run db:generate
    ```

5. **Run migrations to apply schema changes:**

    ```sh
    npm run db:migrate
    ```

6. **Push schema changes to the database:**

    ```sh
    npm run db:push
    ```

7. **Open the Drizzle Studio UI (Optional, for DB visualization):**

    ```sh
    npm run db:studio
    ```

## Available Scripts

| Script                      | Description                                |
|------------------------------|--------------------------------------------|
| `npm run build` | Compiles TypeScript (tsc) and removes old build files (rimraf). |
| `npm run db:generate`        | Generates a schema snapshot based on Drizzle ORM definitions.               |
| `npm run db:migrate`        | Runs database migrations (migrate.ts).                  |
| `npm run db:push`        | Pushes schema changes to the database using Drizzle ORM.                  |
| `npm run db:studio`        | Opens Drizzle Studio for visualizing the database.                  |

## Dependencies

- **@neondatabase/serverless**: Serverless PostgreSQL client for NeonDB.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`
- **drizzle-orm**: A modern TypeScript ORM for SQL databases.
- **pg**: PostgreSQL database client for Node.js.
- **rimraf**: A deep deletion module for node (like rm -rf)
- **ws**: WebSocket library (optional for real-time features).

## Dev Dependencies

- **@types/node**: TypeScript definitions for Node.js.
- **@types/pg**: TypeScript definitions for pg (PostgreSQL client).
- **@types/ws**: TypeScript definitions for WebSockets.
- **drizzle-kit**: CLI tool for managing Drizzle ORM migrations.
- **tsx**: Fast TypeScript execution for Node.js.
- **typescript**: TypeScript language

## Contributing

This project is not actively seeking contributions, but if you have ideas or improvements, feel free to open an issue or submit a pull request.

## License

This project is open for personal and educational use. No specific license applies.

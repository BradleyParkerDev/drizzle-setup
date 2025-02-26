"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_core_1 = require("drizzle-orm/pg-core");
const SessionCronJobs = (0, pg_core_1.pgTable)('session_cron_jobs', {
    cronJobId: (0, pg_core_1.uuid)('cron_job_id').primaryKey().defaultRandom(), // Unique identifier for each cron job entry
    lastChecked: (0, pg_core_1.timestamp)('last_checked').notNull(), // Time when the job was run
    sessionsDeleted: (0, pg_core_1.integer)('sessions_deleted').notNull(), // Number of sessions deleted
});
exports.default = SessionCronJobs;

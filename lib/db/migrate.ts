import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

config();

const runMigrate = async () => {
  const url = process.env.POSTGRES_URL;
  if (!url) {
    throw new Error('POSTGRES_URL is not defined. Please set it in your environment variables.');
  }

  // Relaxed PostgreSQL URL validation (allows optional port and query params)
  const pgUrlPattern = /^postgres(?:ql)?:\/\/[^:]+:[^@]+@[^/]+\/[^\s]+/;
  if (!pgUrlPattern.test(url)) {
    throw new Error(
      `POSTGRES_URL is invalid: "${url}"
Expected format: postgres://user:password@host[:port]/database[?params]
Check for typos, missing credentials, or unsupported URL schemes.`
    );
  }

  const connection = postgres(url, { max: 1 });
  const db = drizzle(connection);

  console.log('⏳ Running migrations...');

  const start = Date.now();
  await migrate(db, { migrationsFolder: './lib/db/migrations' });
  const end = Date.now();

  console.log('✅ Migrations completed in', end - start, 'ms');
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error('❌ Migration failed');
  console.error(err);
  process.exit(1);
});

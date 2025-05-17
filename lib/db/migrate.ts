import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres, { type Sql } from 'postgres'; // Import Sql type
import { config as loadDotenv } from 'dotenv';

// Explicitly load .env.development.local, where `vercel env pull` stores variables
loadDotenv({ path: '.env.development.local' });

const runMigrate = async () => {
  const postgresUrlFromEnv = process.env.POSTGRES_URL;

  console.log(
    'POSTGRES_URL from process.env (after dotenv loading .env.development.local):',
    JSON.stringify(postgresUrlFromEnv),
  );

  if (!postgresUrlFromEnv) {
    throw new Error(
      'POSTGRES_URL is not defined in .env.development.local or environment',
    );
  }

  let cleanedUrl = postgresUrlFromEnv;

  if (typeof cleanedUrl === 'string') {
    // The input string from Vercel env might be like: 'postgres\\x3a//user...'
    // This means it literally contains a backslash, then 'x', then '3', then 'a'.
    // We need to replace the literal sequence '\\x3a' with ':'.
    // In a JS regex, to match a literal backslash, you use '\\\\'.
    // The error log `input: 'postgres\\x3a//...'` shows the string *actually* contains
    // a *single* literal backslash followed by x3a.
    // To match that single literal backslash in a regex, you use `\\`.
    // Therefore, to match the sequence `\\x3a` (a single literal backslash, then x, then 3, then a)
    // the correct regex is `/\\x3a/g`.
    cleanedUrl = cleanedUrl.replace(/\\x3a/g, ':');

    // Remove any newline characters that might have been introduced.
    cleanedUrl = cleanedUrl.replace(/(\r\n|\n|\r)/gm, '');

    // Trim whitespace from the start and end of the string.
    cleanedUrl = cleanedUrl.trim();
  } else {
    console.error(
      'POSTGRES_URL is not a string and cannot be processed:',
      postgresUrlFromEnv,
    );
    throw new Error('POSTGRES_URL is not a string type');
  }

  if (postgresUrlFromEnv !== cleanedUrl) {
    console.warn(
      'POSTGRES_URL was malformed. Original:',
      JSON.stringify(postgresUrlFromEnv),
      'Attempted Clean:',
      JSON.stringify(cleanedUrl),
    );
  } else {
    console.log(
      'POSTGRES_URL appears clean or was already cleaned:',
      JSON.stringify(cleanedUrl),
    );
  }

  console.log('Attempting to connect with URL:', JSON.stringify(cleanedUrl));

  let connection: Sql<Record<string, unknown>> | undefined; // Add type annotation
  try {
    connection = postgres(cleanedUrl, { max: 1 });
    console.log('Successfully initialized postgres connection object.');
  } catch (error) {
    console.error('Failed to initialize postgres connection object:', error);
    console.error(
      'URL used for connection attempt:',
      JSON.stringify(cleanedUrl),
    );
    // Log the type of error if possible
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
    }
    throw error; // Re-throw the error to be caught by the outer catch block
  }

  const db = drizzle(connection);
  console.log('Drizzle instance created.');

  console.log('⏳ Running migrations...');

  const start = Date.now();
  try {
    await migrate(db, { migrationsFolder: './lib/db/migrations' });
  } catch (error) {
    console.error('Error during migrate(db, ...) call:', error);
    if (error instanceof Error) {
      console.error('Migration Error name:', error.name);
      console.error('Migration Error message:', error.message);
    }
    throw error; // Re-throw to be caught by outer catch
  }
  const end = Date.now();

  console.log('✅ Migrations completed in', end - start, 'ms');
  process.exit(0);
};

runMigrate().catch((err) => {
  console.error('❌ Migration failed in migrate.ts');
  // Ensure the error object itself is logged if it has more details
  if (err instanceof Error) {
    console.error('Caught Error Name:', err.name);
    console.error('Caught Error Message:', err.message);
    if (err.cause) {
      console.error('Cause:', err.cause);
    }
    console.error('Stack:', err.stack);
  } else {
    console.error('Caught non-Error object:', err);
  }
  process.exit(1);
});

import { defineConfig } from 'drizzle-kit';

import { DATABASE_URL } from './dist/config.js';

export default defineConfig({
    dialect: 'postgresql',
    schema: './dist/schema.js',
    dbCredentials: {
        url: DATABASE_URL,
    },
});

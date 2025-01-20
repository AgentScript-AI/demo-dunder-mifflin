import { jsonb, pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';

export const agent = pgTable('agent', {
    id: uuid('id').primaryKey(),
    state: jsonb('state').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

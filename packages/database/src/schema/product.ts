import { bigserial, integer, numeric, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

/**
 * Product table
 */
export const product = pgTable('product', {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    name: text('name').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    stock: integer('stock').notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

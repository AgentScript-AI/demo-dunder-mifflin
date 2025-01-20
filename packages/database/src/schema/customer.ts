import { pgTable, bigserial, timestamp, text } from 'drizzle-orm/pg-core';

export const customer = pgTable('customer', {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    name: text('name').notNull(),
    phone: text('phone'),
    email: text('email'),
    address: text('address'),
    city: text('city'),
    state: text('state'),
    zip: text('zip'),
    country: text('country'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

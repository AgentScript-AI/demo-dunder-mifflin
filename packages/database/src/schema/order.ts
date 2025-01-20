import { relations } from 'drizzle-orm';
import { bigint, bigserial, decimal, integer, pgTable, timestamp } from 'drizzle-orm/pg-core';

import { customer } from './customer.js';
import { product } from './product.js';

export /**
 *
 */
const order = pgTable('order', {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    customerId: bigint('customer_id', { mode: 'bigint' }).notNull(),
    total: decimal('total', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
});

export /**
 *
 */
const orderRelations = relations(order, ({ one }) => ({
    customer: one(customer, {
        fields: [order.customerId],
        references: [customer.id],
    }),
}));

export /**
 *
 */
const orderItem = pgTable('order_item', {
    id: bigserial('id', { mode: 'bigint' }).primaryKey(),
    orderId: bigint('order_id', { mode: 'bigint' }).notNull(),
    productId: bigint('product_id', { mode: 'bigint' }).notNull(),
    quantity: integer('quantity').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
});

export /**
 *
 */
const orderItemRelations = relations(orderItem, ({ one }) => ({
    order: one(order, {
        fields: [orderItem.orderId],
        references: [order.id],
    }),
    product: one(product, {
        fields: [orderItem.productId],
        references: [product.id],
    }),
}));

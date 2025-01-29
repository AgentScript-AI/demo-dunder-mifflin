import * as db from '@dunder-mifflin/database';
import type { SQL, SQLWrapper } from 'drizzle-orm';
import { and, desc, eq, gt, gte, lt, lte, not } from 'drizzle-orm';

import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

import { NumberFilter } from '../models/NumberFilter.js';
import { Product } from '../models/Product.js';

const SortDirection = s.enum(['asc', 'desc']);
const SortField = s.enum(['name', 'price', 'stock']);

/**
 * List  products
 */
export const listProducts = defineTool({
    input: {
        sort: s.object({
            optional: true,
            props: {
                field: SortField,
                direction: s.optional(SortDirection),
            },
        }),
        limit: s.number({ optional: true }),
        filters: s.object({
            optional: true,
            props: {
                stock: s.optional(NumberFilter),
                price: s.optional(NumberFilter),
            },
        }),
    },
    output: s.array(Product),
    handler: async ({ input }) => {
        const where: SQL[] = [];

        if (input.filters?.stock) {
            where.push(buildNumberFilter(input.filters.stock, db.product.stock));
        }

        if (input.filters?.price) {
            where.push(buildNumberFilter(input.filters.price, db.product.price));
        }

        const products = await db.client.query.product.findMany({
            orderBy: buildOrder(input.sort?.field, input.sort?.direction),
            limit: input.limit,
            where: and(...where),
            columns: {
                id: true,
                name: true,
                price: true,
                stock: true,
            },
        });

        return products.map(product => ({
            ...product,
            price: Number(product.price),
        }));
    },
});

function buildOrder(field?: s.Infer<typeof SortField>, direction?: s.Infer<typeof SortDirection>) {
    const orderBy = buildOrderBy(field);

    if (orderBy && direction === 'desc') {
        return desc(orderBy);
    }

    return orderBy;
}

function buildOrderBy(field?: s.Infer<typeof SortField>) {
    switch (field) {
        case 'name':
            return db.product.name;
        case 'price':
            return db.product.price;
        case 'stock':
            return db.product.stock;
    }
}

function buildNumberFilter(filter: s.Infer<typeof NumberFilter>, column: SQLWrapper) {
    switch (filter.operator) {
        case '=':
            return eq(column, filter.value);
        case '!=':
            return not(eq(column, filter.value));
        case '<':
            return lt(column, filter.value);
        case '<=':
            return lte(column, filter.value);
        case '>':
            return gt(column, filter.value);
        case '>=':
            return gte(column, filter.value);
    }
}

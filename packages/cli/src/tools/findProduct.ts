import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

import { Product } from '../models/Product.js';

/**
 * Find a product
 */
export const findProduct = defineTool({
    description: ['Use this tool to find a product using a free-form query.'],
    input: {
        query: s.string(),
    },
    output: s.extend(Product, {
        nullable: true,
        description: 'null if no product was found.',
    }),
    handler: ({ input }) => {
        return null;
    },
});

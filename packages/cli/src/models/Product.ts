import * as s from 'agentscript-ai/schema';

/**
 * Product
 */
export const Product = s.object({
    name: 'Product',
    props: {
        id: s.bigint(),
        name: s.string(),
        price: s.number(),
        stock: s.number(),
    },
});

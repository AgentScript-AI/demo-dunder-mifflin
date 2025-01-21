import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

import { Message } from '../components/Message.js';
import { Product } from '../models/Product.js';
import { renderOnce } from '../utils/renderOnce.js';

/**
 * Tool to restock a product.
 */
export const restockProduct = defineTool({
    input: {
        product: Product,
        quantity: s.integer({
            description: 'Number of products to add.',
        }),
    },
    output: Product,
    handler({ input }) {
        const product = input.product;
        product.stock += input.quantity;

        renderOnce(
            <Message
                role="assistant"
                text={`Restocking ${input.quantity} of product ${product.name}`}
            />,
        );

        return product;
    },
});

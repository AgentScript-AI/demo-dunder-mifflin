import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

/**
 * Place an order
 */
export const placeOrder = defineTool({
    description: [
        'Before placing an order, ask the user for products and quantities using while loop.',
    ],
    input: {
        products: s.array(
            s.object({
                props: {
                    productId: s.bigint(),
                    quantity: s.number(),
                },
            }),
        ),
    },
    handler: ({ input }) => {
        return;
    },
});

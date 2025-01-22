import { Table } from '@tqman/ink-table';
import { Text, render } from 'ink';
import SelectInput from 'ink-select-input';

import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

import { Message } from '../components/Message.js';
import { Product } from '../models/Product.js';

/**
 * Tool to restock a product.
 */
export const restockProducts = defineTool({
    description: [
        'Restocks products. Updates the product in place.',
        'Use only if explicitly asked.',
        'If quantity is not explicitly provided, ask for it.',
    ],
    input: {
        products: s.array({
            of: s.object({
                props: {
                    product: Product,
                    quantity: s.integer(),
                },
            }),
        }),
    },
    output: s.boolean({
        description: 'Whether the action was confirmed by the user.',
    }),
    async handler({ input }) {
        const products = input.products.map(product => ({
            id: product.product.id.toString(),
            product: product.product.name,
            quantity: product.quantity,
            currentStock: product.product.stock,
            newStock: product.product.stock + product.quantity,
        }));

        const confirm = await new Promise<boolean>(resolve => {
            const submit = (item: { value: boolean }) => {
                unmount();
                resolve(item.value);
            };

            const { unmount } = render(
                <Message
                    title="Restocking products"
                    color="yellowBright"
                >
                    <Table data={products} />
                    <Text>Do you want to restock these {input.products.length} products?</Text>
                    <SelectInput
                        items={[
                            { label: 'Yes', value: true },
                            { label: 'No', value: false },
                        ]}
                        onSelect={submit}
                    />
                </Message>,
            );
        });

        return confirm;
    },
});

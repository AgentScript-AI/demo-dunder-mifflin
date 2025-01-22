import { Text } from 'ink';

import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

import { Message } from '../components/Message.js';
import { getNumberInput as getInput } from '../utils/getNumberInput.js';
import { renderOnce } from '../utils/renderOnce.js';

/**
 * Tool to get a number from the user.
 */
export const getNumberInput = defineTool({
    description: [
        'Do not make up your own numbers (like quantity or price).',
        'Use this tool to get a number from the user.',
    ],
    input: {
        question: s.string({
            description: 'The question to ask the user.',
        }),
    },
    output: s.number(),
    async handler({ input }) {
        const number = await getInput({
            label: input.question,
            color: 'yellowBright',
        });

        renderOnce(
            <Message
                title={input.question}
                color="yellowBright"
            >
                <Text>{number}</Text>
            </Message>,
        );

        return number;
    },
});

import { Text } from 'ink';

import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';

import { Message } from '../components/Message.js';
import { getStringInput as getInput } from '../utils/getStringInput.js';
import { renderOnce } from '../utils/renderOnce.js';

/**
 * Tool to get a string from the user.
 */
export const getStringInput = defineTool({
    description: ['Use this tool to get a string from the user (e.g. name, email, address, etc.).'],
    input: {
        question: s.string({
            description: 'The question to ask the user.',
        }),
    },
    output: s.string(),
    async handler({ input }) {
        const str = await getInput({
            label: input.question,
            color: 'yellowBright',
        });

        renderOnce(
            <Message
                title={input.question}
                color="yellowBright"
            >
                <Text>{str}</Text>
            </Message>,
        );

        return str;
    },
});

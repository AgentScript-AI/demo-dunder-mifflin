import { Table } from '@tqman/ink-table';
import SyntaxHighlight from 'ink-syntax-highlight';

import { defineTool } from 'agentscript-ai';
import * as s from 'agentscript-ai/schema';
import { toJson } from 'agentscript-ai/schema';

import { AssistantMessage } from '../components/Message.js';
import { renderOnce } from '../utils/renderOnce.js';

/**
 * Tool to reply to the user.
 */
export const replyToUser = defineTool({
    description: 'Use it whenever you have something to say or show to the user.',
    input: s.object({
        props: {
            message: s.string({
                description: 'Message to send to the user',
            }),
            data: s.unknown({
                description: [
                    'Any data to pass to the user. Can be anything: string, array, object, etc.',
                    'If you pass an array, it will be rendered as a table.',
                ],
                optional: true,
            }),
        },
    }),
    handler({ input }) {
        const data = renderData(input.data);

        renderOnce(<AssistantMessage text={input.message}>{data}</AssistantMessage>);
    },
});

function renderData(data: unknown) {
    if (data == null) {
        return null;
    }

    if (Array.isArray(data)) {
        return <Table data={data} />;
    }

    return (
        <SyntaxHighlight
            language="json"
            code={toJson(data, 2)}
        />
    );
}

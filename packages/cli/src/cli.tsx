import { anthropic } from '@ai-sdk/anthropic';
import { Text, render } from 'ink';
import Spinner from 'ink-spinner';
import SyntaxHighlight from 'ink-syntax-highlight';

import type { AgentFor } from 'agentscript-ai';
import { chainAgent, defineAgent, executeAgent, inferAgent, planMetadata } from 'agentscript-ai';

import { Logo } from './components/Logo.js';
import { AssistantMessage, Message, UserMessage } from './components/Message.js';
import * as tools from './tools.js';
import { getStringInput } from './utils/getStringInput.js';
import { renderOnce } from './utils/renderOnce.js';

renderOnce(<Logo />);
renderOnce(<AssistantMessage text="Hi, how may I assist you?" />);

const model = anthropic('claude-3-5-sonnet-latest');

const systemPrompt = [
    'You are Dwight Schrute, a salesman at Dunder Mifflin paper company. Act like him and use his tone.',
    'Do not make up data or numbers. If missing data, ask the user for input using .',
];

const agentDef = defineAgent({ tools });

const agent = await runAgent(prompt =>
    inferAgent({
        ...agentDef,
        model,
        systemPrompt,
        prompt,
    }),
);

while (true) {
    await runAgent(prompt =>
        chainAgent({
            agent,
            model,
            systemPrompt,
            prompt,
        }),
    );
}

async function runAgent(agentFactory: (prompt: string) => Promise<AgentFor<typeof agentDef>>) {
    const prompt = await getStringInput({
        label: 'You',
    });

    renderOnce(<UserMessage text={prompt} />);
    const { clear } = render(
        <AssistantMessage>
            <Text>
                Wait a moment
                <Spinner type="simpleDots" />
            </Text>
        </AssistantMessage>,
    );

    const agent = await agentFactory(prompt);
    clear();

    const plan = planMetadata(agent);
    if (plan) {
        renderOnce(
            <>
                <AssistantMessage text={plan} />
                {agent.script.code && (
                    <Message
                        title="AgentScript code"
                        color="magenta"
                    >
                        <SyntaxHighlight
                            language="typescript"
                            code={agent.script.code}
                        />
                    </Message>
                )}
            </>,
        );
    }

    await executeAgent({
        agent,
    });

    return agent;
}

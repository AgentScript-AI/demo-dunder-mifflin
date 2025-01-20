import { Text, render } from 'ink';
import Spinner from 'ink-spinner';
import SyntaxHighlight from 'ink-syntax-highlight';

import { executeAgent, inferAgent } from 'agentscript-ai';
import { AnthropicModel } from 'agentscript-ai/anthropic';

import { Logo } from './components/Logo.js';
import { Message } from './components/Message.js';
import * as tools from './tools.js';
import { getInput } from './utils/getInput.js';
import { renderOnce } from './utils/renderOnce.js';

renderOnce(<Logo />);
renderOnce(
    <Message
        role="assistant"
        text="Hi, how may I assist you?"
    />,
);

const prompt = await getInput({
    label: 'Enter your query',
});

renderOnce(
    <Message
        role="user"
        text={prompt}
    />,
);

const model = AnthropicModel({
    model: 'claude-3-5-sonnet-latest',
    apiKey: process.env.ANTHROPIC_API_KEY,
    maxTokens: 1024,
});

const { clear } = render(
    <Message role="assistant">
        <Text>
            Wait a moment
            <Spinner type="simpleDots" />
        </Text>
    </Message>,
);

const agent = await inferAgent({
    llm: model,
    tools,
    systemPrompt:
        'You are Dwight Schrute, a salesman at Dunder Mifflin paper company. Act like him and use his tone.',
    prompt: prompt,
});

clear();

if (agent.plan) {
    renderOnce(
        <>
            <Message
                role="assistant"
                text={agent.plan}
            />
            {agent.script.code && (
                <Message role="code">
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

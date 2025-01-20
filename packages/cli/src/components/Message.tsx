import { Box, Text } from 'ink';

import { Block } from './Block.js';

interface MessageProps {
    role: 'user' | 'assistant' | 'code';
    text?: string;
    children?: React.ReactNode;
}

/**
 * A message.
 * @param props - The props for the message.
 * @param props.children - The children of the message.
 * @param props.role - The role of the message.
 * @param props.text - The text of the message.
 * @returns The message.
 */
export function Message({ role, text, children }: MessageProps) {
    const author = getAuthor(role);
    const color = getColor(role);

    return (
        <Block align={role === 'user' ? 'right' : 'left'}>
            <Box
                marginRight={role === 'user' ? 0 : 20}
                marginLeft={role === 'user' ? 20 : 0}
            >
                <Box
                    flexDirection="column"
                    borderStyle="round"
                    borderColor={color}
                    paddingLeft={1}
                    paddingRight={1}
                >
                    <Text color={color}>{author}: </Text>
                    {text && <Text>{text}</Text>}
                    {children}
                </Box>
            </Box>
        </Block>
    );
}

function getColor(role: MessageProps['role']) {
    switch (role) {
        case 'user':
            return 'cyan';
        case 'assistant':
            return 'green';
        case 'code':
            return 'magenta';
    }
}

function getAuthor(role: MessageProps['role']) {
    switch (role) {
        case 'user':
            return 'You';
        case 'assistant':
            return 'Dwight Schrute';
        case 'code':
            return 'AgentScript code';
    }
}

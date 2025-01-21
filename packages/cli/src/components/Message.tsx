import { Box, Text } from 'ink';

import { Block } from './Block.js';
import { ColoredBox } from './ColoredBox.js';

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
    const align = getAlign(role);
    const margin = getMargin(role);

    return (
        <Block align={align}>
            <Box
                marginRight={margin.right}
                marginLeft={margin.left}
            >
                <ColoredBox
                    color={color}
                    title={author}
                >
                    {text && <Text>{text}</Text>}
                    {children}
                </ColoredBox>
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

function getAlign(role: MessageProps['role']) {
    switch (role) {
        case 'user':
            return 'right';
        case 'assistant':
            return 'left';
        case 'code':
            return 'center';
    }
}

function getMargin(role: MessageProps['role']) {
    switch (role) {
        case 'user':
            return { left: 20, right: 0 };
        case 'assistant':
            return { left: 0, right: 20 };
        case 'code':
            return { left: 10, right: 10 };
    }
}

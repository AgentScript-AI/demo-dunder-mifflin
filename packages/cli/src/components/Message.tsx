import { Box, Text } from 'ink';

import { Block } from './Block.js';
import { ASSISTANT_NAME } from '../constants.js';
import type { Color } from '../types.js';

interface MessageProps {
    title: string;
    color: Color;
    align?: 'left' | 'right' | 'center';
    text?: string;
    children?: React.ReactNode;
}

/**
 * A message.
 * @param props - The props for the message.
 * @param props.children - The children of the message.
 * @param props.title - The title of the message.
 * @param props.color - The color of the message.
 * @param props.align - The alignment of the message.
 * @param props.text - The text of the message.
 * @returns The message.
 */
export function Message({ title, color, align, text, children }: MessageProps) {
    const margin = getMargin(align);

    return (
        <Block align={align}>
            <Box
                marginRight={margin.right}
                marginLeft={margin.left}
                flexDirection="column"
                borderStyle="round"
                borderColor={color}
                paddingLeft={1}
                paddingRight={1}
            >
                <Text color={color}>{title}: </Text>
                {text && <Text>{text}</Text>}
                {children}
            </Box>
        </Block>
    );
}

/**
 * A message from the user.
 * @param props - The props for the message.
 * @param props.text - The text of the message.
 * @param props.children - The children of the message.
 * @returns The message.
 */
export function UserMessage({ text, children }: Pick<MessageProps, 'text' | 'children'>) {
    return (
        <Message
            title="You"
            color="blue"
            align="right"
            text={text}
        >
            {children}
        </Message>
    );
}

/**
 * A message from the assistant.
 * @param props - The props for the message.
 * @param props.text - The text of the message.
 * @param props.children - The children of the message.
 * @returns The message.
 */
export function AssistantMessage({ text, children }: Pick<MessageProps, 'text' | 'children'>) {
    return (
        <Message
            title={ASSISTANT_NAME}
            color="green"
            align="left"
            text={text}
        >
            {children}
        </Message>
    );
}

function getMargin(align?: MessageProps['align']) {
    switch (align) {
        case 'right':
            return { left: 20, right: 0 };
        case 'left':
            return { left: 0, right: 20 };
        case 'center':
        default:
            return { left: 10, right: 10 };
    }
}

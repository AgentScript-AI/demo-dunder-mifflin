import { Box, Text } from 'ink';

import type { Color } from '../types.js';

interface ColoredBoxProps {
    children: React.ReactNode;
    color: Color;
    title?: string;
}

/**
 * A box with a colored border.
 * @param props - The props for the box.
 * @param props.children - The children of the box.
 * @param props.color - The color of the border.
 * @param props.title - The title of the box.
 * @returns The box.
 */
export function ColoredBox({ children, color, title }: ColoredBoxProps) {
    return (
        <Box
            flexDirection="column"
            borderStyle="round"
            borderColor={color}
            paddingLeft={1}
            paddingRight={1}
        >
            <Text color={color}>{title}: </Text>
            {children}
        </Box>
    );
}

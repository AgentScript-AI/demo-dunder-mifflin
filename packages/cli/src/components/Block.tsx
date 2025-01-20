import { Box } from 'ink';
import type { ReactNode } from 'react';

import { MAX_WIDTH } from '../constants.js';

interface BlockProps {
    children: ReactNode;
    align?: 'left' | 'center' | 'right';
}

/**
 * A block of text.
 * @param props - The props for the block.
 * @param props.children - The children of the block.
 * @param props.align
 * @returns The block of text.
 */
export function Block({ children, align }: BlockProps) {
    const width = Math.min(process.stdout.columns, MAX_WIDTH);

    return (
        <Box justifyContent="center">
            <Box
                width={width}
                flexDirection="column"
                alignItems={getAlign(align)}
            >
                {children}
            </Box>
        </Box>
    );
}

function getAlign(align: BlockProps['align']) {
    switch (align) {
        case 'left':
            return 'flex-start';
        case 'right':
            return 'flex-end';
        case 'center':
            return 'center';
    }
}

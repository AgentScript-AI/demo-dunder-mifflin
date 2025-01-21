import type { Box } from 'ink';
import type { ComponentProps } from 'react';

/**
 * The color type.
 */
export type Color = ComponentProps<typeof Box>['borderColor'];

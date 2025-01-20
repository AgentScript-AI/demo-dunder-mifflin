import { Box } from 'ink';
import BigText from 'ink-big-text';
import Divider from 'ink-divider';

import { Block } from './Block.js';

/**
 * Render the Dunder Mifflin logo.
 * @returns The Dunder Mifflin logo.
 */
export function Logo() {
    return (
        <Block>
            <Box
                flexDirection="column"
                marginBottom={1}
            >
                <Box
                    flexDirection="column"
                    alignItems="center"
                >
                    <BigText
                        text="Dunder Mifflin"
                        backgroundColor="cyan"
                    />
                    <BigText
                        text="Paper Company"
                        font="tiny"
                    />
                </Box>
                <Divider
                    dividerColor="white"
                    dividerChar="="
                />
            </Box>
        </Block>
    );
}

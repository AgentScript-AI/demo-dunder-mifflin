import { createPromise } from '@nzyme/utils';
import { Box, Text, render } from 'ink';
import TextInput from 'ink-text-input';
import { useState } from 'react';

import { Block } from '../components/Block.js';

type InputProps = {
    onSubmit: (query: string) => void;
    label?: string;
};

const Input = ({ onSubmit, label }: InputProps) => {
    const [query, setQuery] = useState('');

    return (
        <Block>
            <Box
                borderStyle="double"
                borderColor="cyan"
                marginTop={1}
                padding={1}
            >
                {label && <Text color="cyan">You: </Text>}

                <TextInput
                    value={query}
                    onChange={setQuery}
                    onSubmit={onSubmit}
                />
            </Box>
        </Block>
    );
};

interface GetInputOptions {
    label?: string;
}

/**
 * Get input from the user.
 * @param options - The options for the input.
 * @returns The input from the user.
 */
export async function getInput(options: GetInputOptions = {}) {
    const promise = createPromise<string>();
    const app = render(
        <Input
            onSubmit={promise.resolve}
            label={options.label}
        />,
    );

    const input = await promise.promise;

    app.clear();

    return input;
}

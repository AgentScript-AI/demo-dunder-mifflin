import { createPromise } from '@nzyme/utils';
import { render } from 'ink';
import TextInput from 'ink-text-input';
import { useState } from 'react';

import { Message } from '../components/Message.js';
import type { Color } from '../types.js';

interface GetInputOptions {
    label: string;
    color?: Color;
}

/**
 * Get input from the user.
 * @param options - The options for the input.
 * @returns The input from the user.
 */
export async function getStringInput(options: GetInputOptions) {
    const promise = createPromise<string>();
    const onSubmit = (query: string) => {
        if (query.trim() === '') {
            return;
        }

        promise.resolve(query);
    };

    const app = render(
        <Input
            onSubmit={onSubmit}
            label={options.label}
            color={options.color || 'blue'}
        />,
    );

    const input = await promise.promise;

    app.clear();

    return input;
}

type InputProps = {
    onSubmit: (query: string) => void;
    label: string;
    color: Color;
};

function Input({ onSubmit, label, color }: InputProps) {
    const [query, setQuery] = useState('');

    return (
        <Message
            title={label}
            color={color}
        >
            <TextInput
                value={query}
                onChange={setQuery}
                onSubmit={onSubmit}
            />
        </Message>
    );
}

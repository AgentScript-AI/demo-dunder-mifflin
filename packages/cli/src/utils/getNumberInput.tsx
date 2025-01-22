import { createPromise } from '@nzyme/utils';
import { render } from 'ink';
import TextInput from 'ink-text-input';
import { useCallback, useState } from 'react';

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
export async function getNumberInput(options: GetInputOptions) {
    const promise = createPromise<number>();
    const app = render(
        <Input
            onSubmit={promise.resolve}
            label={options.label}
            color={options.color || 'blue'}
        />,
    );

    const input = await promise.promise;

    app.clear();

    return input;
}

type InputProps = {
    onSubmit: (query: number) => void;
    label: string;
    color: Color;
};

function Input({ onSubmit, label, color }: InputProps) {
    const [query, setQuery] = useState<number | null>(null);

    const change = useCallback((query: string) => {
        const number = Number(query);
        if (isNaN(number)) {
            return;
        }

        setQuery(number);
    }, []);

    const submit = useCallback(() => {
        if (query === null) {
            return;
        }

        onSubmit(query);
    }, [onSubmit, query]);

    return (
        <Message
            title={label}
            color={color}
        >
            <TextInput
                value={query?.toString() ?? ''}
                onChange={change}
                onSubmit={submit}
            />
        </Message>
    );
}

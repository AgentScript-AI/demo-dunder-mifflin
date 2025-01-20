import * as s from 'agentscript-ai/schema';

/**
 * Number filter
 */
export const NumberFilter = s.object({
    name: 'NumberFilter',
    props: {
        operator: s.enum(['=', '!=', '<', '<=', '>', '>=']),
        value: s.number(),
    },
});

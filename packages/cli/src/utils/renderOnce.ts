import { render } from 'ink';
import type { ReactNode } from 'react';

/**
 * Render a component once and wait for it to unmount.
 * @param node - The component to render.
 */
export function renderOnce(node: ReactNode) {
    const app = render(node);
    app.unmount();
}

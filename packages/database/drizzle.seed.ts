import { promises as fs } from 'fs';

import { postgres } from './dist/client.js';

const customers = await fs.readFile('./seed/customers.sql', 'utf8');
const products = await fs.readFile('./seed/products.sql', 'utf8');

await postgres.unsafe(customers);
await postgres.unsafe(products);

console.log('Seed completed');
process.exit(0);

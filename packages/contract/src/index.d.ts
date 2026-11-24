// Public entry of the contract package.
// `schema.d.ts` is generated from api/openapi.yaml – never edit it by hand, run `npm run gen:contract`.
import type { components, operations, paths } from './schema.js';

export type { components, operations, paths };

/** All named schemas of the contract, e.g. `Schemas['User']`. */
export type Schemas = components['schemas'];

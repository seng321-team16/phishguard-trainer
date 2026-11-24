import type { Schemas } from '@phishguard/contract';

export type Health = Schemas['Health'];

/** Calls `GET /api/v1/health` (same origin; proxied by Vite in dev, by nginx in Compose). */
export async function fetchHealth(): Promise<Health> {
  const response = await fetch('/api/v1/health', { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Health check failed with status ${response.status}`);
  }
  return (await response.json()) as Health;
}

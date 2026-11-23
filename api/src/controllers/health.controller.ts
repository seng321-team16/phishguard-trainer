import type { Schemas } from '@phishguard/contract';
import type { Request, Response } from 'express';

/** GET /health – liveness probe, no authentication (operationId `getHealth`). */
export function getHealth(_req: Request, res: Response<Schemas['Health']>): void {
  res.status(200).json({ status: 'ok' });
}

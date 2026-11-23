import express, { type Express } from 'express';
import { v1Router } from './routes/index.js';

export const API_PREFIX = '/api/v1';

/**
 * Builds the Express app without binding a port, so tests can drive it
 * in-process with Supertest. `server.ts` is the only place that listens.
 */
export function createApp(): Express {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '100kb' }));

  app.use(API_PREFIX, v1Router);

  return app;
}

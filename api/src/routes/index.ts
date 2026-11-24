import { Router } from 'express';
import { healthRouter } from './health.routes.js';

/** Everything the API serves. Mounted under `/api/v1` in `app.ts`. */
export const v1Router = Router();

v1Router.use(healthRouter);

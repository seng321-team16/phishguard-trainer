import { pino } from 'pino';
import { API_PREFIX, createApp } from './app.js';
import { loadConfig } from './config.js';

const logger = pino({ name: 'phishguard-api' });

try {
  const config = loadConfig();
  const app = createApp();

  app.listen(config.PORT, () => {
    logger.info({ port: config.PORT, prefix: API_PREFIX }, 'API listening');
  });
} catch (error) {
  const reason = error instanceof Error ? error.message : 'unknown error';
  logger.fatal({ reason }, 'API failed to start');
  process.exit(1);
}

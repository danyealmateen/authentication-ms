require('dotenv').config();

import config from './app/config';
import { server } from './app/initializer/express';
import { logger } from './app/lib/logger';

try {
  logger.info(`[${config.APP_NAME}] Bootstrapping micro service`);
  server({ hostname: config.NODE_HOSTNAME, port: config.NODE_PORT });
} catch (error) {
  logger.error(`[${name}] Caught exception: ${error}`);
}

require('dotenv').config();

import { server } from './app/initializer/express';
import { logger } from './app/lib/logger';

const name = process.env.NODE_NAME;
const hostname = process.env.NODE_HOSTNAME;
const port = process.env.NODE_PORT;

try {
  logger.info(`[${name}] Bootstrapping micro service`);
  server({ hostname, port });
} catch (error) {
  logger.error(`[${name}] Caught exception: ${error}`);
}

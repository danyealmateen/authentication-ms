import * as express from 'express';
import createServer from './libs/express';
import { routes } from '../../component/controller';
import { logger } from '../../lib/logger';

const app = express();

const server = ({ hostname, port }) =>
  createServer({
    app,
    routes,
    logger,
  }).server({ hostname, port });

export { server };

import { logger } from '../../lib/logger';
import { post } from '../use-cases';
import { get } from '../use-cases';
import config from '../../config';
const baseUrl = '/api/v1';

const getEP = async (req, res) => {
  try {
    const results = await get();
    res.json({ err: 0, data: results });
  } catch (err) {
    logger.info(`[EP][GET] ${req.method}: ${err.message}`);
    res.status(403);
    res.json({ err: 1, data: { err } });
  }
};

const postEP = async (req, res) => {
  try {
    const results = await post({ params: req.body });
    res.json({ err: 0, data: results });
  } catch (err) {
    logger.info(`[EP][POST] ${req.method}: ${err.message}`);
    res.status(403);
    res.json({ err: 1, data: { err } });
  }
};

const routes = [
  { path: `${baseUrl}/`, method: 'get', component: getEP },
  { path: `${baseUrl}/`, method: 'post', component: postEP },
];

export { routes };

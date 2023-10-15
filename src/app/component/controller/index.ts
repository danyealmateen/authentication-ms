import { logger } from '../../lib/logger';
import { post } from '../use-cases';
import { fs } from '../use-cases';
import { path } from '../use-cases';
const baseUrl = '/api/v1';
const theRealPath =
  'C:\\Users\\danye\\Desktop\\dev\\node\\backend\\authentication-ms\\data\\userfile.json';

const user = {
  username: 'ring',
  password: 'ding',
};

//POST
const postEP = async (req, res) => {
  try {
    await post({ params: user });
    res.json({ params: user });
  } catch (err) {
    logger.error(err);
  }
};

//GET
const getEP = async (req, res) => {
  try {
    const filePath = path.resolve(theRealPath);
    const userData = JSON.parse(await fs.readFile(filePath, 'utf-8'));
    res.json(userData);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('nope');
  }
};

const routes = [
  { path: `${baseUrl}/`, method: 'get', component: getEP },
  { path: `${baseUrl}/`, method: 'post', component: postEP },
];

export { routes };

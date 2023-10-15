import { logger } from '../../lib/logger';
const fs = require('fs').promises;

const createPost = async (
  { mkdir, writeFile },
  { params, filePath, fileDir }
) => {
  try {
    try {
      await mkdir(fileDir, { recursive: true });
      logger.error('Dir created or already exist');
    } catch (err) {
      logger.error('cant create directory');
      throw err;
    }

    let users = [];
    try {
      const existingData = await fs.readFile(filePath, 'utf8');
      users = JSON.parse(existingData);
    } catch (err) {
      logger.warn('file cannot be read or does not exist');
    }

    if (users.find((user) => user.username === params.username)) {
      throw new Error('User already exists');
    }

    users.push(params);
    await writeFile(filePath, JSON.stringify(users, null, 2));

    return params;
  } catch (err) {
    logger.log('cannot write file', err);
    throw err;
  }
};
export default createPost;

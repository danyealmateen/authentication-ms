import createPost from './post';
import { logger } from '../../lib/logger';
const fs = require('fs').promises;
const path = require('path');

const baseDir = process.cwd();
const fileDir = path.join(baseDir, process.env.NODE_FILE_FOLDER) || '';
const filename = process.env.NODE_DB_FILE || 'default_filename.json';
const filePath = path.join(fileDir, filename);

const post = async ({ params }) => {
  return await createPost({ ...fs }, { params, filePath, fileDir });
};

export { post, fs, path };

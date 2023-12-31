import { access, mkdir, writeFile, readFile } from 'node:fs/promises';
import createPost from './post';
import createGet from './get';
import config from '../../config';
import { logger } from '../../lib/logger';

const fileDirName = config.FILE_FOLDER_NAME;
const fileDirPath = config.FILE_FOLDER_PATH;
const filename = config.FILE_DB_NAME;
const filePath = config.FILE_DB_PATH;
const errorMsgs = config.ERROR_MSG;

const post = ({ params }) =>
  createPost({
    access,
    mkdir,
    writeFile,
    readFile,
    logger,
  }).post({ params, filename, fileDirPath, fileDirName, filePath, errorMsgs });

const get = () =>
  createGet({
    access,
    readFile,
    logger,
  }).get({ filePath: config.FILE_DB_PATH, filename: config.FILE_DB_NAME });

export { post, get };

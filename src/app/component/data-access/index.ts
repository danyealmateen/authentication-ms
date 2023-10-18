import { access, mkdir, writeFile, readFile } from 'node:fs/promises';

import config from '../../config';
import { logger } from '../../lib/logger';
import makeCheckDir from './check-dir';
import makeWriteToFile from './write-to-file';
import makeReadFromFile from './read-from-file';

const checkDir = ({ fileDirPath, fileDirName }) =>
  makeCheckDir({ access, mkdir, logger }).checkDir({
    fileDirPath,
    fileDirName,
  });

const writeToFile = ({ content, filePath, filename }) =>
  makeWriteToFile({ writeFile, logger }).writeToFile({
    content,
    filePath,
    filename,
  });

const readFromFile = ({ filePath, filename }) =>
  makeReadFromFile({ readFile, logger }).readFromFile({ filePath, filename });

export { checkDir, writeToFile, readFromFile };

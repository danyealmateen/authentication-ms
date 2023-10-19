import * as path from 'path';
const APP_NAME = process.env.NODE_NAME;
const NODE_ENV = 'test';
const FILE_FOLDER_NAME = 'data';
const FILE_FOLDER_PATH = path.join(__dirname, '/data/');
const FILE_DB_NAME = 'users.json';
const FILE_DB_PATH = `${FILE_FOLDER_PATH}/${FILE_DB_NAME}`;

const ERROR_MSG = {
  NO_DATA: 'no data to insert',
  EXISTING_USER: 'user already exists',
  INVALID_STRING: 'string is invalid',
};
const TEST_DATA = {
  user1: {
    username: 'user1',
    password: 'password1',
  },
  user2: {
    username: 'user2',
    password: 'password2',
  },
};

export default Object.freeze({
  APP_NAME,
  NODE_ENV,
  ERROR_MSG,
  FILE_FOLDER_NAME,
  FILE_FOLDER_PATH,
  FILE_DB_NAME,
  FILE_DB_PATH,
  TEST_DATA,
});

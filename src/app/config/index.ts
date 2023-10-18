const APP_NAME = process.env.NODE_NAME;
const NODE_ENV = process.env.NODE_ENV;
const NODE_HOSTNAME = process.env.NODE_HOSTNAME;
const NODE_PORT = process.env.NODE_PORT;
const FILE_FOLDER_NAME = process.env.NODE_FILE_FOLDER;
const FILE_FOLDER_PATH = process.cwd() + process.env.NODE_FILE_FOLDER;
const FILE_DB_NAME = 'users.json';
const FILE_DB_PATH = `${FILE_FOLDER_PATH}/${FILE_DB_NAME}`;
const ERROR_MSG = {
  post: {
    NO_DATA: 'no data to insert',
    EXISTING_USER: 'user already exists',
  },
};

export default Object.freeze({
  APP_NAME,
  ERROR_MSG,
  NODE_ENV,
  NODE_HOSTNAME,
  NODE_PORT,
  FILE_FOLDER_NAME,
  FILE_FOLDER_PATH,
  FILE_DB_NAME,
  FILE_DB_PATH,
});

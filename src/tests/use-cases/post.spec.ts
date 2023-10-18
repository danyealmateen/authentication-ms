/* istanbul ignore file */
require('dotenv').config();

const expect = require('chai').expect;
import createPost from '../../app/component/use-cases/post';
import * as path from 'path';
import config from '../config/index';
import { logger } from '../../app/lib/logger';

import { access, mkdir, writeFile, readFile, rm } from 'node:fs/promises';

const post = ({ params }) =>
  createPost({
    access,
    mkdir,
    writeFile,
    readFile,
    logger,
  }).post({
    params,
    filename: config.FILE_DB_NAME,
    fileDirPath: config.FILE_FOLDER_PATH,
    fileDirName: config.FILE_FOLDER_NAME,
    filePath: config.FILE_DB_PATH,
    errorMsgs: config.ERROR_MSG,
  });

describe('Post', () => {
  after(() => rm(config.FILE_FOLDER_PATH, { recursive: true }));

  it('should insert a user', async () => {
    const params = {
      username: config.TEST_DATA.user1.username,
      password: config.TEST_DATA.user1.password,
    };
    const results = await post({ params });
    const fileContent = await readFile(config.FILE_DB_PATH);
    const users = JSON.parse(fileContent);
    expect(results).to.have.property('username').equal(params.username);
    expect(users.length).to.equal(1);
    expect(users[0]).to.have.property('username').equal(params.username);
  });

  it('should not insert an empty user', async () => {
    const params = {
      username: undefined,
      password: undefined,
    };
    try {
      let results = await post({ params });
    } catch (err) {
      expect(err).to.equal(config.ERROR_MSG.NO_DATA);
    }
  });

  it('should not insert an existing user', async () => {
    const params = {
      username: config.TEST_DATA.user1.username,
      password: config.TEST_DATA.user1.password,
    };
    try {
      let results = await post({ params });
    } catch (err) {
      expect(err).to.equal(config.ERROR_MSG.EXISTING_USER);
    }
  });

  it('should insert another user', async () => {
    const params = {
      username: config.TEST_DATA.user2.username,
      password: config.TEST_DATA.user2.password,
    };
    await post({ params });
    const results = await readFile(config.FILE_DB_PATH, { encoding: 'utf8' });
    expect(Object.keys(JSON.parse(results)).length).to.equal(2);
  });
});

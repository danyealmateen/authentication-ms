/* istanbul ignore file */
require('dotenv').config();

const expect = require('chai').expect;
import createPost from '../../app/component/use-cases/post';
import config from '../config/index';
import { logger } from '../../app/lib/logger';
import { access, readFile, mkdir, writeFile, rm } from 'node:fs/promises';

const post = (params) =>
  createPost({
    access,
    readFile,
    writeFile,
    mkdir,
    logger,
  }).post(params);

describe('post Use-Case', () => {
  before(async () => {
    await mkdir(config.FILE_FOLDER_PATH);
  });

  after(async () => rm(config.FILE_FOLDER_PATH, { recursive: true }));

  // ... (your other tests related to the post operation)

  describe('newUser Entity', () => {
    it('should correctly construct a newUser entity', async () => {
      const params = {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com',
      };

      await post(params);

      const storedUsers = JSON.parse(
        await readFile(config.FILE_DB_PATH, 'utf8')
      );
      const newUser = storedUsers.find((user) => user.email === params.email);

      // Check properties from params
      expect(newUser.name).to.equal(params.name);
      expect(newUser.age).to.equal(params.age);
      expect(newUser.email).to.equal(params.email);

      // Check timestamps
      expect(newUser).to.have.property('created');
      expect(newUser).to.have.property('modified');

      // Ensure timestamps are recent (within a second of now)
      expect(Date.now() - newUser.created).to.be.lessThan(1000);
      expect(Date.now() - newUser.modified).to.be.lessThan(1000);
    });
  });
});

/* istanbul ignore file */
require('dotenv').config();

const expect = require('chai').expect;
import createGet from '../../app/component/use-cases/get';
import config from '../config/index';
import { logger } from '../../app/lib/logger';
import { access, readFile, mkdir, writeFile, rm } from 'node:fs/promises';

describe('get use-case', () => {
  let users;

  // Setup - Kör detta innan testerna
  before(async () => {
    // Förbered testdata
    const usersObj = config.TEST_DATA;
    users = [usersObj.user1, usersObj.user2];

    await mkdir(config.FILE_FOLDER_PATH);
    await writeFile(config.FILE_DB_PATH, JSON.stringify(users));
  });

  // Teardown - Kör detta efter testerna
  after(async () => {
    await rm(config.FILE_FOLDER_PATH, { recursive: true });
  });

  // Testfallet
  it('should return a list of users with the correct number of users', async () => {
    const getFunction = createGet({
      access,
      readFile,
      logger,
    }).get;

    const results = await getFunction({
      filePath: config.FILE_DB_PATH,
      filename: config.FILE_DB_NAME,
    });

    expect(results).to.be.an('array');
    expect(results.length).to.equal(2); // Förväntar oss 2 användare
    expect(results).to.deep.equal(users); // Kontrollerar att returnerade användare matchar testdata
  });
});

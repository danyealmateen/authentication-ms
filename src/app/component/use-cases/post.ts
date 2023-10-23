import makeOutputObject from '../entities/make-output-object';
import makeInputObjectFactory from '../entities/make-input-object';
import { md5 } from '../entities';
import * as sanitize from 'sanitize-html';

const outputObject = makeOutputObject();
const inputFactory = makeInputObjectFactory({ md5, sanitize });

export default function createPost({
  access,
  mkdir,
  writeFile,
  readFile,
  logger,
}) {
  return Object.freeze({ post });

  async function post({
    params,
    filename,
    fileDirPath,
    fileDirName,
    filePath,
    errorMsgs,
  }) {
    try {
      if (params.username === undefined || params.password === undefined)
        throw new Error(errorMsgs.NO_DATA);

      const validatedInput = inputFactory.inputObj({
        params: {
          username: params.username,
          password: params.password,
        },
        errorMsgs: errorMsgs,
      });

      const validatedUsername = validatedInput.username();
      const validatedPassword = validatedInput.password();

      logger.info(`[USE-CASE][POST] Inserting user to ${filename} - START!`);
      await access(filePath);
      logger.info(`[USE-CASE][POST] Reading file ${filename} - START!`);
      const fileContents = await readFile(filePath, { encoding: 'utf8' });
      const users = JSON.parse(fileContents);
      logger.info(`[USE-CASE][POST] Reading file ${filename} - DONE!`);
      logger.info(`[USE-CASE][POST] Validating params - START!`);

      const existingUser = users.filter(
        (user) => user.username === validatedUsername
      );
      if (existingUser.length) throw new Error(errorMsgs.EXISTING_USER);
      logger.info(`[USE-CASE][POST] Validating params - DONE!`);

      const newUser = {
        username: validatedUsername,
        password: validatedPassword,
        created: Date.now(),
        modified: Date.now(),
      };

      users.push(newUser);
      await writeFile(filePath, JSON.stringify(users));
      logger.info(`[USE-CASE][POST] Writing to file ${filename} - DONE!`);
      logger.info(`[USE-CASE][POST] Inserting user to ${filename} DONE!`);
      return outputObject.transformData(newUser);
      
    } catch (e) {
      if (e.message.startsWith('[VALIDATION FAILURE]')) {
        throw e.message;
      }

      if (
        e.message === errorMsgs.NO_DATA ||
        e.message === errorMsgs.EXISTING_USER
      ) {
        throw e.message;
      }
      logger.info(
        `[USE-CASE][POST] Creating directory: ${fileDirName} - START!`
      );
      await mkdir(fileDirPath);
      logger.info(
        `[USE-CASE][POST] Creating directory: ${fileDirName} - DONE!`
      );
      logger.info(
        `[USE-CASE][POST] Creating and writing to file ${filename} - START!`
      );
      const initialUser = {
        ...params,
        created: Date.now(),
        modified: Date.now(),
      };
      await writeFile(filePath, JSON.stringify([initialUser]));
      logger.info(
        `[USE-CASE][POST] Creating and writing to file ${filename} - DONE!`
      );
      logger.info(`[USE-CASE][POST] Inserting user to ${filename} - DONE!`);
      return outputObject.transformData(initialUser);
    }
  }
}

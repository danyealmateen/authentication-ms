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

      logger.info(`[USE-CASE][POST] Inserting user to ${filename} - START!`);
      await access(filePath);

      logger.info(`[USE-CASE][POST] Reading file ${filename} - START!`);
      const fileContents = await readFile(filePath, { encoding: 'utf8' });
      const users = JSON.parse(fileContents);
      logger.info(`[USE-CASE][POST] Reading file ${filename} - DONE!`);

      logger.info(`[USE-CASE][POST] Validating params - START!`);

      const existingUser = users.filter(
        (user) => user.username === params.username
      );
      if (existingUser.length) throw new Error(errorMsgs.EXISTING_USER);
      logger.info(`[USE-CASE][POST] Validating params - DONE!`);

      logger.info(`[USE-CASE][POST] Writing to file ${filename} - START!`);
      users.push(params);
      await writeFile(filePath, JSON.stringify(users));
      logger.info(`[USE-CASE][POST] Writing to file ${filename} - DONE!`);

      logger.info(`[USE-CASE][POST] Inserting user to ${filename} DONE!`);
      return params;
    } catch (e) {
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
      await writeFile(filePath, JSON.stringify([params]));
      logger.info(
        `[USE-CASE][POST] Creating and writing to file ${filename} - DONE!`
      );

      logger.info(`[USE-CASE][POST] Inserting user to ${filename} - DONE!`);

      return params;
    }
  }
}

import { checkDir, readFromFile } from '../data-access';

export default function createGet({ access, readFile, logger }) {
  return Object.freeze({ get });

  async function get({ filePath, filename }) {
    try {
      logger.info(`[USE-CASE][GET] Reading from file${filename} - START!`);
      await checkDir(filePath);
      const fileContent = await readFromFile(filePath);
      logger.info(`[USE-CASE][GET] Reading from file ${filename} - DONE!`);
      return JSON.parse(fileContent);
    } catch (e) {
      throw e.message;
    }
  }
}

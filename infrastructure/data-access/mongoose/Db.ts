import mongoose from 'mongoose';

import { ILogger } from '../../../logger/Logger';

export async function openConnection(uri: string, logger: ILogger): Promise<void> {
  try {
    await mongoose.set('strictQuery', false).connect(uri);
    logger.info('Connection to mongo successfully opened!');
  } catch (err) {
    logger.error('Failed to open connection to mongo', err);
    throw err;
  }
}

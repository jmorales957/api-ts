import * as dotenv from 'dotenv';

import { logger } from '../logger/PinoLogger';
import { configSchema } from './Schema';
import { IConfig } from './Type';

dotenv.config();

export function initConfig() {
  const config = {
    http: {
      port: process.env['HTTP_PORT']
    },
    baseLogger: logger(process.env['LOG_LEVEL']!),
    mongo: {
      url: process.env['MONGO_URI']
    },
    auth: {
      secretJwt: process.env['SECRET_JWT'],
      saltRounds: process.env['SALT_ROUNDS']
    }
  };

  const { error, value } = configSchema.validate(config);

  if (error) {
    logger('error').child('Config').error('Config parse failed', error);
    throw new Error('Config parse failed');
  }
  const configValidated: IConfig = value;
  return configValidated;
}

import pino from 'pino';

import { ILogger } from './Logger';

export const logger: (logLevel: string) => ILogger = (logLevel: string) => {
  return pino({
    level: logLevel
  });
};

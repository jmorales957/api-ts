import { IDataAccess } from '../../infrastructure/data-access/IDataAccess';

import { ILogger } from '../../logger/Logger';
import { IServices } from './IServices';
import { authService } from './auth/service';
import { sequenceService } from './sequence/service';
import { userService } from './user/service';

export const services = (dataAccess: IDataAccess, loggerFactory: ILogger): IServices => {
  const logger = loggerFactory.child({ module: 'services' });
  logger.info('starting services');
  try {
    const sequenceServiceSetUp = sequenceService(dataAccess, logger);
    const authServiceSetUp = authService(dataAccess, logger);
    const userServiceSetUp = userService(dataAccess, logger);
    logger.info('Dependencies fully injected');
    return {
      sequenceService: sequenceServiceSetUp,
      authService: authServiceSetUp,
      userService: userServiceSetUp
    };
  } catch (e) {
    logger.error(e, 'failed on start services');
    throw e;
  }
};

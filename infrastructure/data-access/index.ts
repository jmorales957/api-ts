import { IConfig } from 'config/Type';

import { ILogger } from '../../logger/Logger';
import { IDataAccess } from './IDataAccess';
import { authModule } from './auth/Module';
import { openConnection } from './mongoose/Db';
import { userRepository } from './mongoose/repositories/user/Repository';
import { sequenceRepository } from './mongoose/repositories/sequence/Repository';

export const dataAccess = async ({ mongo, auth }: IConfig, loggerFactory: ILogger): Promise<IDataAccess> => {
  const logger = loggerFactory.child({ module: 'dataAccess' });
  try {
    openConnection(mongo.url, logger.child({ service: 'MongoDb' }));
    const authModuleSetUp = authModule(auth, logger.child({ dataAccess: 'authModule' }));
    const userRepositorySetUp = userRepository(auth, logger.child({ dataAccess: 'userRepository' }));
    const sequenceRepositorySetUp = sequenceRepository(logger.child({ dataAccess: 'sequenceRepository' }));

    return {
      sequenceRepository: sequenceRepositorySetUp,
      authModule: authModuleSetUp,
      userRepository: userRepositorySetUp
    };
  } catch (e) {
    logger.error('Failed to initialize Data access with error:', e);
    throw e;
  }
};

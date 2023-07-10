import { useCases } from './application';
import { initialSetup } from './application/use-cases/Setup/initialSetup/InitialSetup';
import { initConfig } from './config';
import { dataAccess } from './infrastructure/data-access';
import { http } from './infrastructure/interfaces/http';
import { services } from './infrastructure/services';

const config = initConfig();
const logger = config.baseLogger;
const loggerInitialSetup = logger.child({ module: 'initialSetup' });
dataAccess(config, logger).then((dataAccessLayer) => {
  const preServiceLayer = services(dataAccessLayer, logger);
  initialSetup(preServiceLayer, loggerInitialSetup)()
    .then(() => {
      const servicesLayer = services(dataAccessLayer, logger);
      const useCasesLayer = useCases(servicesLayer, logger);
      http(useCasesLayer, config.http.port, config.baseLogger);
    })
    .then(async () => {
      return {};
    })
    .catch((e: Error) => loggerInitialSetup.error(e));
});

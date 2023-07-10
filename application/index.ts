import { IServices } from 'infrastructure/services/IServices';

import { ILogger } from '../logger/Logger';
import { useCaseFactory } from './use-cases';

export const useCases = (services: IServices, loggerFactory: ILogger) => {
  return useCaseFactory(services, loggerFactory);
};

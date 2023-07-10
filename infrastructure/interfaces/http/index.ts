import { ILogger } from '../../../logger/Logger';
import { server } from './express';
import { presentError } from './presenters/Errors';
import { presentResponse } from './presenters/Results';
import { routes } from './routes';

export const http = (uoc: any, port: number, baseLogger: ILogger) =>
  server(routes(uoc), presentResponse, presentError, port, baseLogger);

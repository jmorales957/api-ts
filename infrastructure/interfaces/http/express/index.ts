import cors from 'cors';
import express from 'express';
import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import pinoHttp from 'pino-http';
import stream from 'stream';

import { ILogger } from '../../../../logger/Logger';
import { schemaValidation } from '../middlewares/SchemaValidation';
import { ResponseMapper } from '../presenters/Results';
import { Route } from '../routes';

const httpLogger = pinoHttp(); //Initialize log for any request
const expressApp = express();
expressApp.use(httpLogger); // _Make log for a request
expressApp.use(cors());
expressApp.set('trust proxy', true); //avoid nginx proxy ip and get actual client ip in req.op
expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: false }));

function extractParams(req: Request) {
  const actorLocation = {
    ip: req.ip,
    userAgent: req.headers['user-agent'],
    originDomain: req.headers.origin
  };
  const identificatorObject = Object.assign(req.headers, { actorLocation });
  return Object.assign({ identificatorObject }, { body: req.body }, req.query, req.params);
}

const errorHandler =
  (mapper: ResponseMapper, logger: ILogger) => async (error: any, req: Request, res: Response, next: any) => {
    const { status, data } = mapper(error);
    res.status(status).json(data);
  };

const responseHandler = (mapper: ResponseMapper, logger: ILogger, route: Route) => async (req: any, res: any) => {
  const { status, data } = mapper(req.results);

  res.status(status).json(data);
};

const endpoint = (uoc: any, route: Route, logger: ILogger) => async (req: any, res: any, next: any) => {
  try {
    req.results = await uoc(extractParams(req));
    next();
  } catch (error) {
    next(error);
  }
};

export const server = (
  routes: Array<Route> = [],
  responseMapper: (code?: number) => ResponseMapper,
  errorMapper: ResponseMapper,
  port: number,
  baseLogger: ILogger
) => {
  const logger = baseLogger.child({ module: 'express' });
  routes.forEach((route: Route) => {
    const path = route.path;
    const handlers = [
      schemaValidation(route.schemaValidation),
      endpoint(route.useCase, route, baseLogger.child({ middleware: 'endpoint' })),
      errorHandler(errorMapper, baseLogger.child({ middleware: 'errorHandler' })),
      responseHandler(responseMapper(route.successCode), baseLogger.child({ middleware: 'responseHandler' }), route)
    ];
    switch (route.verb.toLowerCase()) {
      case 'get':
        expressApp.get(path, handlers);
        break;
      case 'post':
        expressApp.post(path, handlers);
        break;
      case 'put':
        expressApp.put(path, handlers);
        break;
      case 'delete':
        expressApp.delete(path, handlers);
        break;
      case 'patch':
        expressApp.patch(path, handlers);
        break;
    }
  });

  const server = expressApp.listen(port);
  logger.info({ port }, 'Server running');
  return server;
};

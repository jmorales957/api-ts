import { ILogger } from '../logger/Logger';

export type IConfig = {
  http: {
    port: number;
  };
  baseLogger: ILogger;
  mongo: {
    url: string;
  };
  auth: {
    secretJwt: string;
    saltRounds: any;
  };
};

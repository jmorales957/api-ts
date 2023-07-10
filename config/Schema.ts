import Joi from 'joi';

export const configSchema = Joi.object({
  http: {
    port: Joi.string()
  },
  baseLogger: Joi.any(),
  mongo: {
    url: Joi.string()
  },
  auth: {
    secretJwt: Joi.string(),
    saltRounds: Joi.any()
  }
});

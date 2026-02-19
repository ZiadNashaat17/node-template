import { LOGGER } from '../logging.js';

export const requestLoggerMiddleware = (req, _res, next) => {
  LOGGER.info(`${req.method} ${req.path}-body:${JSON.stringify(req.body)}`);
  next();
};

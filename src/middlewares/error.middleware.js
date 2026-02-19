import { serverEnv } from '../config.js';
import { LOGGER } from '../logging.js';
import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map(el => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please login again', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired! Please login again', 401);

const sendErrorDev = (err, req, res) => {
  LOGGER.info('ss');
  LOGGER.error(err);

  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, req, res) => {
  //* If operational error *\\
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      errors: err.errors,
      message: err.message,
    });

    //* If programming error *\\
  }
  LOGGER.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};

export default (err, req, res, _next) => {
  err.statusCode = err.statusCode || 400;
  err.status = err.status || 'error';
  if (serverEnv.nodeEnv === 'development' || serverEnv.nodeEnv === 'staging') {
    sendErrorDev(err, req, res);
  }
  else {
    let error = err;
    if (error.name === 'CastError')
      error = handleCastErrorDB(error);
    if (error.code === 11000)
      error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError')
      error = handleJWTError();
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError();

    sendErrorProd(error, req, res);
  }
};

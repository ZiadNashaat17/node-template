import express from 'express';
import errorHandlerMiddleware from './middlewares/error.middleware.js';
import { requestLoggerMiddleware } from './middlewares/requestLoggerMiddleware.js';
import AppError from './utils/appError.js';

const app = express();

app.use(express.json());

app.use(requestLoggerMiddleware);

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use((req, res, next) => {
  return next(new AppError('Route not found', 404));
});

app.use(errorHandlerMiddleware);

export default app;

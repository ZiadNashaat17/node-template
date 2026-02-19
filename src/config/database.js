import mongoose from 'mongoose';
import { serverEnv } from '../config.js';
import { LOGGER } from '../logging.js';

// MongoDB connection function
const RETRY_DELAY = 60000;
let isReconnecting = false; // Flag to track reconnection state

async function connectDB() {
  if (isReconnecting) {
    LOGGER.info('A reconnection attempt is already in progress...');
    return;
  }

  isReconnecting = true;

  while (true) {
    try {
      const connString = serverEnv.mongoUri;

      await mongoose.connect(connString);
      LOGGER.info('MongoDB connected successfully');

      isReconnecting = false;
      return;
    }
    catch (error) {
      LOGGER.error(error);

      LOGGER.info(`Retrying in ${RETRY_DELAY / 1000} seconds...`);

      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
}

// Listen for MongoDB connection events
mongoose.connection.on('disconnected', () => {
  LOGGER.info('MongoDB disconnected.');

  LOGGER.info(`Will attempt reconnection in ${RETRY_DELAY / 1000} seconds...`);

  setTimeout(async () => {
    LOGGER.info('Attempting to reconnect to MongoDB...');

    await connectDB();
  }, RETRY_DELAY);
});

export default connectDB;

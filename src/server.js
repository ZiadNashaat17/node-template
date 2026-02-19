import app from './app.js';
import { serverEnv } from './config.js';
import connectDB from './config/database.js';
import { LOGGER } from './logging.js';

const port = serverEnv.port;

(async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      LOGGER.info(`Server is running on port ${port}`);
    });
  }
  catch (error) {
    LOGGER.error(error);
  }
})();

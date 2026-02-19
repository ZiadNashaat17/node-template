import { config } from 'dotenv';
import { z } from 'zod';

config();

const NodeEnvEnum = z.enum(['development', 'staging', 'production', 'test']);

export const envSchema = z.object({
  NODE_ENV: NodeEnvEnum.default('development'),
  PORT: z.coerce.number().default(3000),
  MONGO_URI: z.string(),
});

// eslint-disable-next-line node/no-process-env
export const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error('Invalid environment variables:', env.error.format());
  throw new Error('Invalid environment variables');
}

const serverEnv = {
  nodeEnv: env.data.NODE_ENV,
  port: env.data.PORT,
  mongoUri: env.data.MONGO_URI,
};

export { serverEnv };

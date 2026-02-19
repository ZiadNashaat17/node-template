import fs from 'node:fs';
import path from 'node:path';
import { pino } from 'pino';
import pretty from 'pino-pretty';

import { serverEnv } from './config.js';

const streams = [
  serverEnv.nodeEnv === 'production' ? process.stdout : pretty(),
  fs.createWriteStream(path.join(process.cwd(), '..', 'process.log')),
];

const LOGGER = pino(
  {
    redact: {
      paths: ['body.password'],
      remove: true,
    },
    formatters: {
      bindings: () => ({}),
    },
  },
  pino.multistream(streams),
);

export { LOGGER };

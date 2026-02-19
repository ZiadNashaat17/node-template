# NodeJS Project Template

A production-ready Node.js template with Express, MongoDB, and modern development practices.

## Features

- **Express 5** - Latest web framework
- **MongoDB with Mongoose** - Database ORM
- **Pino Logger** - High-performance JSON logging
- **Zod Validation** - Type-safe environment variables and schema validation
- **Error Handling** - Production-grade error middleware with operational/programming error distinction
- **ESLint + Husky** - Code quality and pre-commit hooks
- **Nodemon** - Auto-restart on file changes
- **Jest** - Testing framework (with Windows support)

## Project Structure

```
Node-Template
├─ .env.example
├─ .husky
│  └─ pre-commit
├─ CONTRIBUTING.md
├─ eslint.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ README.md
└─ src
   ├─ app.js
   ├─ config
   │  └─ database.js
   ├─ config.js
   ├─ logging.js
   ├─ middlewares
   │  ├─ error.middleware.js
   │  ├─ requestLoggerMiddleware.js
   │  └─ validateRequest.js
   ├─ routes
   │  ├─ examplesRoutes.js
   │  └─ index.js
   ├─ server.js
   └─ utils
      └─ appError.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 5.0+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd node-template
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/node-template
   ```

### Running the Application

**Development** (with auto-reload):
```bash
pnpm start
```

**Production**:
```bash
NODE_ENV=production npm start
```

## Available Scripts

- `pnpm start` - Start development server with nodemon
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm test` - Run tests (uses ESM modules)
- `pnpm test:windows` - Run tests on Windows
- `pnpm prepare` - Setup Husky hooks

## Environment Variables

See `.env.example` for required variables.

| Variable | Type | Default | Description |
|----------|------|---------|-------------|
| `NODE_ENV` | string | `development` | Environment (development/staging/production/test) |
| `PORT` | number | `3000` | Server port |
| `MONGO_URI` | string | - | MongoDB connection string |

## Error Handling

The template includes a production-grade error handler:

- **Operational Errors** (predictable, like 404) - Return structured JSON responses
- **Programming Errors** (bugs) - Logged internally, generic response sent to client
- **Database Errors** - Automatic conversion (CastError, ValidationError, DuplicateKey)
- **JWT Errors** - Dedicated handlers

Create custom errors:
```javascript
import AppError from './utils/appError.js';

throw new AppError('Resource not found', 404);
```

## Logging

Pino is configured with:
- Pretty output in development
- JSON output in production
- File rotation support
- Password redaction in request bodies

```javascript
import { LOGGER } from './logging.js';

LOGGER.info('Application started');
LOGGER.error(error);
```

## Code Quality

### Linting
Configured with `@antfu/eslint-config` and custom rules:
- Single quotes required
- Semicolons required
- 2-space indentation
- camelCase file names

### Pre-commit Hooks
Husky runs ESLint on staged files before each commit.

## Testing

```bash
# Run tests
pnpm test

# Run tests on Windows
pnpm test:windows
```

Use [mongodb-memory-server](https://github.com/typegoose/mongodb-memory-server) for isolated database testing.

## Performance Considerations

- MongoDB connection pooling is configured
- Automatic reconnection with backoff
- Request logging includes performance metrics
- Pino's JSON logging is optimized for production

## Deployment

### Environment Setup
Ensure these variables are set in production:
```env
NODE_ENV=production
PORT=<your-port>
MONGO_URI=<production-mongodb-uri>
```

### Docker (Optional)
Create a `Dockerfile`:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src ./src
EXPOSE 3000
CMD ["npm", "start"]
```

## Security Notes

- Never commit `.env` files
- Use environment variables for sensitive data
- Validate all user input with Zod schemas
- Keep dependencies updated: `pnpm update`
- Review ESLint security rules

## Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint:fix`
4. Commit your work (Husky will lint automatically)
5. Push and create a PR

## License

ISC

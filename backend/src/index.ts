import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import config from './config';
import logger from './logger/winston.logger';
import requestLogger from './logger/request.logger';
import apiRouter from './routes';
import { globalErrorHandler } from './errors/error.middleware';
import { NotFoundError } from './errors/app-error';

const app = express();

// --- 1. Global Middlewares ---
// Standard HTTP headers security enhancement
app.use(helmet());

// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

// Compress response bodies for enhanced transmission performance
app.use(compression());

// Parse JSON request payloads
app.use(express.json());

// Parse URL-encoded bodies (form submits)
app.use(express.urlencoded({ extended: true }));

// Parse HttpOnly cookie tokens
app.use(cookieParser());

// Log incoming request details
app.use(requestLogger);

// --- 2. REST Endpoints ---
app.use(config.API_PREFIX, apiRouter);

// Fallback Route for handling unmatched endpoints (404)
app.all('*', (req, _res, next) => {
  next(
    new NotFoundError(`Requested endpoint (${req.method} ${req.originalUrl}) could not be found`),
  );
});

// --- 3. Global Error Handling ---
app.use(globalErrorHandler);

// --- 4. Server Initialization ---
const server = app.listen(config.PORT, () => {
  logger.info(`🚀 Server running in ${config.NODE_ENV} mode on port ${config.PORT}`);
  logger.info(`👉 API endpoints exposed at: http://localhost:${config.PORT}${config.API_PREFIX}`);
});

// Handle uncaught exceptions and unhandled rejections gracefully
process.on('uncaughtException', (err: Error) => {
  logger.error('CRITICAL: Uncaught Exception thrown!', err);
  logger.info('Shutting down server...');
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('CRITICAL: Unhandled Promise Rejection detected!', reason as Error);
  logger.info('Shutting down server...');
  server.close(() => {
    process.exit(1);
  });
});

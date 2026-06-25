import winston from 'winston';
import config from '../config';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

// Custom text format for development console logging
const devFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let log = `[${timestamp}] [${level}]: ${message}`;
  if (stack) {
    log += `\nStack Trace: ${stack}`;
  }
  if (Object.keys(metadata).length > 0 && !(metadata instanceof Error)) {
    log += ` | Meta: ${JSON.stringify(metadata)}`;
  }
  return log;
});

// Determine logging formats based on the current execution environment
const getFormats = () => {
  if (config.NODE_ENV === 'production') {
    return combine(
      timestamp(),
      errors({ stack: true }),
      json(), // Log json logs in production for scraping/ELK/Datadog
    );
  }
  return combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    devFormat,
  );
};

export const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: getFormats(),
  defaultMeta: { service: 'enterprise-backend' },
  transports: [
    // Output all logs to console
    new winston.transports.Console(),

    // Output all logs with status 'error' and below to error.log file
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      maxsize: 5242880, // 5MB limit
      maxFiles: 5,
    }),

    // Output all logs to combined.log file
    new winston.transports.File({
      filename: 'logs/combined.log',
      maxsize: 10485760, // 10MB limit
      maxFiles: 5,
    }),
  ],
});

export default logger;

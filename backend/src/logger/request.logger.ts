import { Request, Response, NextFunction } from 'express';
import logger from './winston.logger';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;

    const message = `${method} ${originalUrl} ${statusCode} - ${duration}ms`;

    const meta = {
      method,
      url: originalUrl,
      status: statusCode,
      durationMs: duration,
      ip,
      userAgent: req.get('user-agent'),
    };

    if (statusCode >= 500) {
      logger.error(message, meta);
    } else if (statusCode >= 400) {
      logger.warn(message, meta);
    } else {
      logger.info(message, meta);
    }
  });

  next();
};

export default requestLogger;

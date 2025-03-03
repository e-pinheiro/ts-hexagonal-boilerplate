import winston, { createLogger, format, transports } from 'winston';
import { Logger, LogLevel } from '../../../domain/ports/Logger.interface';

export class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), format.simple()),
        }),
      ],
    });
  }

  setLevel(level: LogLevel): void {
    this.logger.level = level.toLowerCase();
  }

  debug(message: string, meta?: any): void {
    this.logger.debug(message, meta);
  }

  info(message: string, meta?: any): void {
    this.logger.info(message, meta);
  }

  warn(message: string, meta?: any): void {
    this.logger.warn(message, meta);
  }

  error(message: string, meta?: any): void {
    this.logger.error(message, meta);
  }
}

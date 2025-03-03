import { Logger, LogLevel } from '../../domain/ports/Logger.interface';
import { WinstonLogger } from '../../adapters/providers/winston/WinstonLogger';

export class LoggerFactory {
  private static instance: Logger;

  public static createLogger(): Logger {
    if (!LoggerFactory.instance) {
      const logger = new WinstonLogger();

      // Set log level based on environment
      const environment = process.env.NODE_ENV || 'development';
      const logLevel =
        environment === 'development' ? LogLevel.DEBUG : LogLevel.INFO;

      logger.setLevel(logLevel);
      LoggerFactory.instance = logger;
    }

    return LoggerFactory.instance;
  }
}

import BusinessException from './BusinessException';
import { Logger } from '../../../domain/ports/Logger.interface';
import { LoggerFactory } from '../../../infrastructure/config/logger.config';

class ValidationErrorException extends BusinessException {
  private logger: Logger;

  constructor(message: string) {
    super(message);
    console.log('Validation Error');
    this.logger = LoggerFactory.createLogger();
    this.logger.error('Validation Error', {
      message,
      stack: this.stack,
      name: this.name,
    });
  }
}

export default ValidationErrorException;

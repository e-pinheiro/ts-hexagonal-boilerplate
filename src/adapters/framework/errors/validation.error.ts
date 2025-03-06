import BusinessError from './business.error';

class ValidationErrorsException extends BusinessError {
  constructor(message: string) {
    super(message);
    console.log('Validation Error');
    console.log(message);
  }
}

export default ValidationErrorsException;

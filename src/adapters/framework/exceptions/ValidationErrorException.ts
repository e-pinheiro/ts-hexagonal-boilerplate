import BusinessException from './BusinessException';

class ValidationErrorException extends BusinessException {
  constructor(message: string) {
    super(message);
    console.log('Validation Error');
    console.log(message);
  }
}

export default ValidationErrorException;

import ValidationErrorException from '../exceptions/ValidationErrorException';
import { ValidationRule } from './ValidationRule.interface';

class MinLengthValidation implements ValidationRule {
  constructor(
    private fieldName: string,
    private minLength: number,
  ) {}

  validate(value: unknown): void {
    if (typeof value === 'string' && value.length < this.minLength) {
      throw new ValidationErrorException(
        `${this.fieldName} must have at least ${this.minLength} characters`,
      );
    }
  }
}

export default MinLengthValidation;

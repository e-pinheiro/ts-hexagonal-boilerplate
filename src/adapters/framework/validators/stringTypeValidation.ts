import ValidationErrorException from '../exceptions/ValidationErrorException';
import { ValidationRule } from './ValidationRule.interface';

class StringTypeValidation implements ValidationRule {
  constructor(private fieldName: string) {}

  validate(value: unknown): void {
    if (typeof value !== 'string') {
      throw new ValidationErrorException(`${this.fieldName} must be a string`);
    }
  }
}

export default StringTypeValidation;

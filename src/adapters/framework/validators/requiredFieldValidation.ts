import ValidationErrorException from '../exceptions/ValidationErrorException';
import { ValidationRule } from './ValidationRule.interface';

class RequiredFieldValidation implements ValidationRule {
  constructor(private fieldName: string) {}

  validate(value: unknown): void {
    if (!value) {
      throw new ValidationErrorException(`${this.fieldName} is required`);
    }
  }
}

export default RequiredFieldValidation;

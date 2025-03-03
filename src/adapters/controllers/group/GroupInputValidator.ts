import { ValidationRule } from '@/adapters/framework/validators/ValidationRule.interface';
import { GroupInputValidator } from '../../framework/GroupInputValidator';
import RequiredFieldValidation from '@/adapters/framework/validators/requiredFieldValidation';
import StringTypeValidation from '@/adapters/framework/validators/stringTypeValidation';
import MinLengthValidation from '@/adapters/framework/validators/minLengthValidation';

export class GroupValidatorImpl implements GroupInputValidator {
  private readonly validationRules: ValidationRule[];

  constructor() {
    this.validationRules = [
      new RequiredFieldValidation('name'),
      new StringTypeValidation('name'),
      new MinLengthValidation('name', 3),
    ];
  }

  validate(input: unknown): void {
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid input');
    }

    const { name } = input as { name?: unknown };

    // Execute todas as validações
    this.validationRules.forEach(rule => rule.validate(name));
  }
}

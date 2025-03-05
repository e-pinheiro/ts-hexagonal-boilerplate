import { Request } from 'express';
import { ValidationException } from '@/adapters/errors/validation.exception';
import { GroupInputValidator } from '../../framework/GroupInputValidator';
import { StringValidator } from '@esp-labs/validators';

export class GroupValidatorImpl implements GroupInputValidator {
  validate(input: Request): void {
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid input');
    }

    try {
      const { name } = input.body as { name?: unknown };

      // library
      new StringValidator({
        fieldName: 'name',
        minLength: 4,
        maxLength: 10,
      }).validate(name);
    } catch (error) {
      throw new ValidationException([(error as Error).message]);
    }
  }
}

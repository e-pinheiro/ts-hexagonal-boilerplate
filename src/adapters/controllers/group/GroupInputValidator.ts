import { GroupInputValidator } from '../../framework/GroupInputValidator';
import { StringValidator } from '@esp-labs/validators';

export class GroupValidatorImpl implements GroupInputValidator {
  validate(input: unknown): void {
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid input');
    }

    const { name } = input as { name?: unknown };

    // library
    new StringValidator({
      fieldName: 'name',
      minLength: 4,
      maxLength: 10,
    }).validate(name);
  }
}

import { Request } from 'express';
import { GroupInputValidator } from '../../framework/GroupInputValidator';
import ValidationErrorException from '@/adapters/framework/errors/validation.error';

export class GroupValidatorImpl implements GroupInputValidator {
  validate(input: Request): void {
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid input');
    }

    const { name } = input.body as { name?: unknown };

    if (typeof name !== 'string') {
      throw new ValidationErrorException(`${`name`} must be a string`);
    }

    if (name.length < 3) {
      throw new ValidationErrorException(
        `${`name`} must be at least ${3} characters long`,
      );
    }

    if (name.length > 255) {
      throw new ValidationErrorException(
        `${`name`} must be at most ${255} characters long`,
      );
    }
  }
}

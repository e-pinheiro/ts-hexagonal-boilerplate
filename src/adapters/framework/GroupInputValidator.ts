import { Request } from 'express';
export interface GroupInputValidator {
  validate(input: Request): void;
}

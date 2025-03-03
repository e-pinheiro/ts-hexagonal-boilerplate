import { CreateGroupInputPort } from '@/domain/ports/input/CreateGroupInputPort';

export interface GroupInputValidator {
  validate(input: unknown): void;
}

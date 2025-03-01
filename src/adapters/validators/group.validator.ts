import { ValidatorPort, ValidationResult } from '../../domain/ports/input/validation.port';
import { CreateGroupDTO } from '../../domain/dtos/group.dto';

type ValidationRule = {
  validate: (value: any) => boolean;
  message: string;
};

export class CreateGroupValidator implements ValidatorPort<CreateGroupDTO> {
  private validateString(value: unknown, minLength?: number, maxLength?: number): string[] {
    const errors: string[] = [];
    if (typeof value !== 'string') {
      errors.push('Value must be a string');
      return errors;
    }
    if (minLength && value.length < minLength) {
      errors.push(`Value must be at least ${minLength} characters long`);
    }
    if (maxLength && value.length > maxLength) {
      errors.push(`Value must not exceed ${maxLength} characters`);
    }
    return errors;
  }

  private validateUUID(value: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  private validateNumber(value: unknown, min?: number): string[] {
    const errors: string[] = [];
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      errors.push('Value must be an integer');
      return errors;
    }
    if (min !== undefined && value < min) {
      errors.push(`Value must be at least ${min}`);
    }
    return errors;
  }

  validate(input: unknown): ValidationResult<CreateGroupDTO> {
    const errors: string[] = [];
    
    if (!input || typeof input !== 'object') {
      return { isValid: false, errors: ['Invalid input format'] };
    }

    const data = input as Record<string, unknown>;

    // Validate name
    const nameErrors = this.validateString(data.name, 3, 50);
    errors.push(...nameErrors);

    // Validate description if present
    if (data.description !== undefined) {
      const descriptionErrors = this.validateString(data.description, undefined, 500);
      errors.push(...descriptionErrors);
    }

    // Validate members
    if (!Array.isArray(data.members)) {
      errors.push('Members must be an array');
    } else if (data.members.length < 1) {
      errors.push('Group must have at least one member');
    } else {
      data.members.forEach((member, index) => {
        if (!this.validateUUID(member)) {
          errors.push(`Invalid member ID at position ${index}`);
        }
      });
    }

    // Validate isPrivate
    if (typeof data.isPrivate !== 'boolean') {
      errors.push('isPrivate must be a boolean');
    }

    // Validate maxMembers if present
    if (data.maxMembers !== undefined) {
      const maxMembersErrors = this.validateNumber(data.maxMembers, 1);
      errors.push(...maxMembersErrors);
    }

    if (errors.length > 0) {
      return { isValid: false, errors };
    }

    return {
      isValid: true,
      data: data as unknown as CreateGroupDTO
    };
  }
} 
import { z } from 'zod';
import { ValidatorPort, ValidationResult } from '../../domain/ports/input/validation.port';
import { CreateGroupDTO } from '../../domain/dtos/group.dto';

export class CreateGroupValidator implements ValidatorPort<CreateGroupDTO> {
  private schema = z.object({
    name: z.string()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must not exceed 50 characters'),
    description: z.string()
      .max(500, 'Description must not exceed 500 characters')
      .optional(),
    members: z.array(z.string().uuid('Invalid member ID'))
      .min(1, 'Group must have at least one member'),
    isPrivate: z.boolean(),
    maxMembers: z.number()
      .int('Max members must be an integer')
      .min(1, 'Max members must be at least 1')
      .optional()
  });

  validate(input: unknown): ValidationResult<CreateGroupDTO> {
    try {
      const result = this.schema.parse(input);
      return {
        isValid: true,
        data: result
      };
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        return {
          isValid: false,
          errors: []
        };
      }
      return {
        isValid: false,
        errors: ['Invalid input format']
      };
    }
  }
} 
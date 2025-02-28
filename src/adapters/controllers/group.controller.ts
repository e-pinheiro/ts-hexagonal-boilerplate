import { CreateGroupValidator } from '../validators/group.validator';
import { ICreateGroupUseCase } from '../../domain/ports/IGroupPorts';

export class GroupController {
  constructor(
    private readonly validator: CreateGroupValidator,
    private readonly createGroupUseCase: ICreateGroupUseCase
  ) {}

  async createGroup(request: unknown) {
    // Validate input
    const validationResult = this.validator.validate(request);
    
    if (!validationResult.isValid) {
      return {
        status: 400,
        body: {
          errors: validationResult.errors
        }
      };
    }

    // If validation passes, proceed with use case
    try {
      const group = await this.createGroupUseCase.execute(validationResult.data!);
      return {
        status: 201,
        body: group
      };
    } catch (error) {
      return {
        status: 500,
        body: {
          error: 'Internal server error'
        }
      };
    }
  }
} 
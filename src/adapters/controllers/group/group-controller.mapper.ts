import { InputMapper } from '@/adapters/framework/mappers/InputMapper.interface';
import { CreateGroupInput } from '@/domain/usecases/group/create-group/create-group.input';

export class GroupControllerMapper implements InputMapper<CreateGroupInput> {
  toInput(input: unknown): CreateGroupInput {
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid input');
    }

    const { name } = input as { name?: unknown };

    return {
      name: name as string,
    };
  }
}

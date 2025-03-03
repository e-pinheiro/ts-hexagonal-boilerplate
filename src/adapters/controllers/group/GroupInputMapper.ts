import { CreateGroupInputDTO } from '@/domain/dtos/group.dto';
import { InputMapper } from '@/adapters/framework/mappers/InputMapper.interface';

export class GroupInputMapper implements InputMapper<CreateGroupInputDTO> {
  toInput(input: unknown): CreateGroupInputDTO {
    if (!input || typeof input !== 'object') {
      throw new Error('Invalid input');
    }

    const { name } = input as { name?: unknown };

    return {
      name: name as string,
    };
  }
}

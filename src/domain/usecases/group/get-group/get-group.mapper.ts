import { Group } from '@/domain/entities/group.entity';
import { GetGroupOutput } from './get-group.output';

export class GetGroupMapper {
  static toOutput(entity: Group): GetGroupOutput {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt.toISOString(),
    };
  }
}

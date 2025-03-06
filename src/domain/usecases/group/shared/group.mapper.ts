import { Group } from '@/domain/entities/group.entity';
import { GroupOutput } from './group.output';

export class GroupMapper {
  static toOutput(entity: Group): GroupOutput {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      createdAt: entity.createdAt.toISOString(),
    };
  }

  static toListOutput(list: Group[]): GroupOutput[] {
    return list.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description,
      createdAt: group.createdAt.toISOString(),
    }));
  }
}

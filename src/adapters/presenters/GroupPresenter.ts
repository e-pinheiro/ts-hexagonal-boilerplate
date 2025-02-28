import { Group } from '../../domain/entities/Group';
import { GroupOutputDTO } from '../../domain/dtos/GroupOutputDTO';

export class GroupPresenter {
  static toDTO(group: Group): GroupOutputDTO {
    return {
      id: group.id,
      name: group.name,
      createdAt: group.createdAt
    };
  }

  static toDTOList(groups: Group[]): GroupOutputDTO[] {
    return groups.map(group => this.toDTO(group));
  }
} 
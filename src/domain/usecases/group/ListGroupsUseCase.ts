import { GetGroupOutput } from '@/domain/ports/output/GetGroupOutput';
import { Group } from '../../entities/Group';
import { IGroupRepository } from '../../ports/IGroupRepository';

export class ListGroupsUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(): Promise<GetGroupOutput[]> {
    const groups = await this.groupRepository.findAll();
    return this.toOutput(groups);
  }

  private toOutput(list: Group[]): GetGroupOutput[] {
    return list.map(group => ({
      id: group.id,
      name: group.name,
      description: group.description,
      createdAt: group.createdAt
    }));
  }
} 
import { Group } from '../../entities/Group';
import { IGroupRepository } from '../../ports/IGroupRepository';
import { GetGroupOutput } from '../../ports/output/GetGroupOutput';

export class GetGroupUseCase {
  constructor(private groupRepository: IGroupRepository) { }

  async execute(id: string): Promise<GetGroupOutput | null> {
    const group = await this.groupRepository.findById(id);

    if (!group) {
      return null;
    }

    return this.toOutput(group);
  }

  private toOutput(group: Group): GetGroupOutput {
    return {
      id: group.id,
      name: group.name,
      description: group.description,
      createdAt: group.createdAt,

    };
  }
} 
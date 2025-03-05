import { Group } from '../../entities/Group';
import { UpdateGroupDTO } from '../../dtos/group.dto';
import { IGroupRepository } from '../../ports/IGroupRepository';

export class UpdateGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(id: string, data: UpdateGroupDTO): Promise<Group | null> {
    console.log(`id: ${id} | data: ${data}`);
    const existingGroup = await this.groupRepository.findById(id);
    if (!existingGroup) return null;

    const updatedGroup = Group.restore(id, data);
    return await this.groupRepository.update(id, updatedGroup);
  }
}

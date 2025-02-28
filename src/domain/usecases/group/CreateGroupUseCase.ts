import { Group } from '../../entities/Group';
import { CreateGroupDTO } from '../../dtos/group.dto';
import { IGroupRepository } from '../../ports/IGroupRepository';
import { randomUUID } from 'crypto';

// Add this interface at the top or move it to a separate file in the DTOs folder
interface CreateGroupOutputDTO {
  id: string;
}

export class CreateGroupUseCase {
  constructor(private groupRepository: IGroupRepository) { }

  async execute(data: CreateGroupDTO): Promise<CreateGroupOutputDTO> {
    const group = new Group({ name: data.name });
    const savedGroup = await this.groupRepository.save(group);
    
    return {
      id: savedGroup.id
    };
  }
} 
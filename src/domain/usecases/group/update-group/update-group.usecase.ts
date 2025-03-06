import { Group } from '@/domain/entities/group.entity';

import { GroupRepositoryPort } from '@/domain/ports/output/repositories/group-repository.port';
import { UpdateGroupInput } from './update-group.input';
import { UpdateGroupOutput } from './update-group.output';
import { UpdateGroupUseCasePort } from '@/domain/ports/input/usecases/group/update-group.port';

export class UpdateGroupUseCase implements UpdateGroupUseCasePort {
  constructor(private groupRepository: GroupRepositoryPort) {}

  async execute(input: UpdateGroupInput): Promise<UpdateGroupOutput | null> {
    const existingGroup = await this.groupRepository.findById(input.id);
    if (!existingGroup) return null;

    const updatedGroup = Group.restore(input.id, input.data);
    await this.groupRepository.update(input.id, updatedGroup);

    return { sucess: true };
  }
}

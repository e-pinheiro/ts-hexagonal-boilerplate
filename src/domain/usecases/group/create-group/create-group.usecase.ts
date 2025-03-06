import { Group } from '@/domain/entities/Group';
import { CreateGroupInput } from './create-group.input';
import { GroupRepositoryPort } from '@/domain/ports/output/repositories/group-repository.port';
import { CreateGroupOutput } from './create-group.output';
import { CreateGroupUseCasePort } from '@/domain/ports/input/usecases/group/create-group.port';

export class CreateGroupUseCase implements CreateGroupUseCasePort {
  constructor(private groupRepository: GroupRepositoryPort) {}

  async execute(data: CreateGroupInput): Promise<CreateGroupOutput> {
    const group = new Group({ name: data.name });
    const savedGroup = await this.groupRepository.save(group);

    return {
      id: savedGroup.id,
    };
  }
}

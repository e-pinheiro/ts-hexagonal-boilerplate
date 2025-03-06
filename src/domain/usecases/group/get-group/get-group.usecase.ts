import { GroupRepositoryPort } from '@/domain/ports/output/repositories/group-repository.port';
import { GetGroupInput } from './get-group.input';
import { GetGroupOutput } from './get-group.output';
import { GroupMapper } from '../shared/group.mapper';
import { GetGroupUseCasePort } from '@/domain/ports/input/usecases/group/get-group.port';

export class GetGroupUseCase implements GetGroupUseCasePort {
  constructor(private groupRepository: GroupRepositoryPort) {}

  async execute(input: GetGroupInput): Promise<GetGroupOutput | null> {
    const group = await this.groupRepository.findById(input.id);

    if (!group) return null;

    return GroupMapper.toOutput(group);
  }
}

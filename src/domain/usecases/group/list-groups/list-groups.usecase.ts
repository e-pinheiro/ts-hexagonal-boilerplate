import { GroupRepositoryPort } from '@/domain/ports/output/repositories/group-repository.port';
import { ListGroupsOutput } from './list-groups.output';
import { GroupMapper } from '../shared/group.mapper';
import { ListGroupUseCasePort } from '@/domain/ports/input/usecases/group/list-group.port';

export class ListGroupsUseCase implements ListGroupUseCasePort {
  constructor(private readonly repository: GroupRepositoryPort) {}

  async execute(): Promise<ListGroupsOutput> {
    const groups = await this.repository.findAll();
    return GroupMapper.toListOutput(groups);
  }
}

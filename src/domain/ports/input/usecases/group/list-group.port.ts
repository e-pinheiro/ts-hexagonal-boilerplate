import { ListGroupsOutput } from '@/domain/usecases/group/list-groups/list-groups.output';

export interface ListGroupUseCasePort {
  execute(): Promise<ListGroupsOutput>;
}

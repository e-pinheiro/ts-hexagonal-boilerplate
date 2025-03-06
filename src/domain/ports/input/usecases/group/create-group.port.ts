import { CreateGroupInput } from '@/domain/usecases/group/create-group/create-group.input';
import { CreateGroupOutput } from '@/domain/usecases/group/create-group/create-group.output';

export interface CreateGroupUseCasePort {
  execute(data: CreateGroupInput): Promise<CreateGroupOutput>;
}

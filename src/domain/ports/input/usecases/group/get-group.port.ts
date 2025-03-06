import { GetGroupInput } from '@/domain/usecases/group/get-group/get-group.input';
import { GetGroupOutput } from '@/domain/usecases/group/get-group/get-group.output';

export interface GetGroupUseCasePort {
  execute(data: GetGroupInput): Promise<GetGroupOutput | null>;
}

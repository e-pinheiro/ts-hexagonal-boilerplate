import { UpdateGroupInput } from '@/domain/usecases/group/update-group/update-group.input';
import { UpdateGroupOutput } from '@/domain/usecases/group/update-group/update-group.output';

export interface UpdateGroupUseCasePort {
  execute(data: UpdateGroupInput): Promise<UpdateGroupOutput | null>;
}

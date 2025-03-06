import { DeleteGroupInput } from '@/domain/usecases/group/delete-group/delete-group.input';
import { DeleteGroupOutput } from '@/domain/usecases/group/delete-group/delete-group.output';

export interface DeleteGroupUseCasePort {
  execute(data: DeleteGroupInput): Promise<DeleteGroupOutput | null>;
}

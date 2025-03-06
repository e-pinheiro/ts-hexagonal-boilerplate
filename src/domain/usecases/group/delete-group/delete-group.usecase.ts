import { GroupRepositoryPort } from '@/domain/ports/output/repositories/group-repository.port';
import { DeleteGroupInput } from './delete-group.input';
import { DeleteGroupOutput } from './delete-group.output';
import { DeleteGroupUseCasePort } from '@/domain/ports/input/usecases/group/delete-group.port';

export class DeleteGroupUseCase implements DeleteGroupUseCasePort {
  constructor(private groupRepository: GroupRepositoryPort) {}

  async execute(input: DeleteGroupInput): Promise<DeleteGroupOutput | null> {
    const existingGroup = await this.groupRepository.findById(input.id);
    if (!existingGroup) return null;

    await this.groupRepository.delete(input.id);
    return { sucess: true };
  }
}

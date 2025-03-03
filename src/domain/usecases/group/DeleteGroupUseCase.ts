import { IGroupRepository } from '../../ports/IGroupRepository';

export class DeleteGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(id: string): Promise<void> {
    await this.groupRepository.delete(id);
  }
}

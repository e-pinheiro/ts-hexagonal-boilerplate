import { IGroupRepository } from '../../ports/IGroupRepository';

export class DeleteGroupUseCase {
  constructor(private groupRepository: IGroupRepository) {}

  async execute(id: string): Promise<string | null> {
    const existingGroup = await this.groupRepository.findById(id);
    if (!existingGroup) return null;

    await this.groupRepository.delete(id);
    return id;
  }
}

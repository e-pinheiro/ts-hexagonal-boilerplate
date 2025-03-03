import { CreateGroupInputDTO } from '../../dtos/group.dto';
import { Group } from '../../entities/Group';

export interface IUpdateGroupUseCase {
  execute(id: string, data: CreateGroupInputDTO): Promise<Group>;
}

import { CreateGroupInputDTO } from '../../dtos/group.dto';
import { Group } from '../../entities/Group';

export interface ICreateGroupUseCase {
  execute(data: CreateGroupInputDTO): Promise<Group>;
}

import { CreateGroupDTO } from '../../dtos/group.dto';
import { Group } from '../../entities/Group';

export interface IUpdateGroupUseCase {
    execute(id: string, data: CreateGroupDTO): Promise<Group>;
} 
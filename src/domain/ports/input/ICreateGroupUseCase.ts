import { CreateGroupDTO } from '../../dtos/group.dto';
import { Group } from '../../entities/Group';

export interface ICreateGroupUseCase {
    execute(data: CreateGroupDTO): Promise<Group>;
} 
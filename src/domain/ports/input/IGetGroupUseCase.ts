import { Group } from '../../entities/Group';

export interface IGetGroupUseCase {
    execute(id: string): Promise<Group>;
} 
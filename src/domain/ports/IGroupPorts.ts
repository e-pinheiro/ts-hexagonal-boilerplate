import { CreateGroupInputDTO } from '../dtos/group.dto';
import { Group } from '../entities/Group';

export interface ICreateGroupUseCase {
  execute(data: CreateGroupInputDTO): Promise<Group>;
}

export interface IUpdateGroupUseCase {
  execute(id: string, data: CreateGroupInputDTO): Promise<Group>;
}

export interface IDeleteGroupUseCase {
  execute(id: string): Promise<void>;
}

export interface IGetGroupUseCase {
  execute(id: string): Promise<Group>;
}

export interface IListGroupsUseCase {
  execute(): Promise<Group[]>;
}

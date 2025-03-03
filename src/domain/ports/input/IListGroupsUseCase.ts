import { Group } from '../../entities/Group';

export interface IListGroupsUseCase {
  execute(): Promise<Group[]>;
}

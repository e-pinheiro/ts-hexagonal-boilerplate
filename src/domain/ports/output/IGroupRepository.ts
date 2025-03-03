import { Group } from '../../entities/Group';

export interface IGroupRepository {
  save(group: Group): Promise<Group>;
  update(id: string, group: Group): Promise<Group | null>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Group | null>;
  findAll(): Promise<Group[]>;
}

import { Group } from '../../domain/entities/Group';
import { IGroupRepository } from '../../domain/ports/IGroupRepository';

export class InMemoryGroupRepository implements IGroupRepository {
  private groups: Group[] = [];

  async save(group: Group): Promise<Group> {
    this.groups.push(group);
    return group;
  }

  async update(id: string, group: Group): Promise<Group | null> {
    const index = this.groups.findIndex(g => g.id === id);
    if (index === -1) return null;

    this.groups[index] = group;
    return group;
  }

  async delete(id: string): Promise<void> {
    const index = this.groups.findIndex(g => g.id === id);
    if (index !== -1) {
      this.groups.splice(index, 1);
    }
  }

  async findById(id: string): Promise<Group | null> {
    return this.groups.find(group => group.id === id) || null;
  }

  async findAll(): Promise<Group[]> {
    return this.groups;
  }
}

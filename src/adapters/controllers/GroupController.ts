import { Request, Response } from 'express';
import { CreateGroupUseCase } from '../../domain/usecases/group/CreateGroupUseCase';
import { UpdateGroupUseCase } from '../../domain/usecases/group/UpdateGroupUseCase';
import { DeleteGroupUseCase } from '../../domain/usecases/group/DeleteGroupUseCase';
import { GetGroupUseCase } from '../../domain/usecases/group/GetGroupUseCase';
import { ListGroupsUseCase } from '../../domain/usecases/group/ListGroupsUseCase';
import { GroupPresenter } from '../presenters/GroupPresenter';

export class GroupController {
  constructor(
    private createGroupUseCase: CreateGroupUseCase,
    private updateGroupUseCase: UpdateGroupUseCase,
    private deleteGroupUseCase: DeleteGroupUseCase,
    private getGroupUseCase: GetGroupUseCase,
    private listGroupsUseCase: ListGroupsUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const group = await this.createGroupUseCase.execute(req.body);
      return res.status(201).json(group);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const group = await this.updateGroupUseCase.execute(req.params.id, req.body);
      if (!group) return res.status(404).json({ error: 'Group not found' });
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteGroupUseCase.execute(req.params.id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const group = await this.getGroupUseCase.execute(req.params.id);
      if (!group) return res.status(404).json({ error: 'Group not found' });
      return res.json(group);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const groups = await this.listGroupsUseCase.execute();
      // return res.json(GroupPresenter.toDTOList(groups));
      return res.json(groups);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }
} 
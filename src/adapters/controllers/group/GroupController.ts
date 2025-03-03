import { Request, Response } from 'express';
import { CreateGroupUseCase } from '../../../domain/usecases/group/CreateGroupUseCase';
import { UpdateGroupUseCase } from '../../../domain/usecases/group/UpdateGroupUseCase';
import { DeleteGroupUseCase } from '../../../domain/usecases/group/DeleteGroupUseCase';
import { GetGroupUseCase } from '../../../domain/usecases/group/GetGroupUseCase';
import { ListGroupsUseCase } from '../../../domain/usecases/group/ListGroupsUseCase';
import { GroupValidatorImpl } from './GroupInputValidator';
import { GroupInputMapper } from './GroupInputMapper';

export class GroupController {
  constructor(
    private createGroupUseCase: CreateGroupUseCase,
    private updateGroupUseCase: UpdateGroupUseCase,
    private deleteGroupUseCase: DeleteGroupUseCase,
    private getGroupUseCase: GetGroupUseCase,
    private listGroupsUseCase: ListGroupsUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      // Validate the request body
      new GroupValidatorImpl().validate(req.body);

      // Map the request body to the input
      const input = new GroupInputMapper().toInput(req.body);

      // Create the group
      const output = await this.createGroupUseCase.execute(input);
      return res.success(output, 201);
    } catch (error) {
      return res.error((error as Error).message, 400);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const group = await this.updateGroupUseCase.execute(
        req.params.id,
        req.body,
      );

      if (!group) return res.error('Group not found', 404);

      return res.success({}, 204);
    } catch (error) {
      return res.error((error as Error).message, 400);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await this.deleteGroupUseCase.execute(req.params.id);
      return res.success({}, 204);
    } catch (error) {
      return res.error((error as Error).message, 400);
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const group = await this.getGroupUseCase.execute(req.params.id);
      if (!group) return res.error('Group not found', 404);
      return res.success(group, 200);
    } catch (error) {
      return res.error((error as Error).message, 400);
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const groups = await this.listGroupsUseCase.execute();
      return res.success(groups, 200);
    } catch (error) {
      return res.error((error as Error).message, 400);
    }
  }
}

import { Request, Response } from 'express';
import { CreateGroupUseCase } from '../../../domain/usecases/group/CreateGroupUseCase';
import { UpdateGroupUseCase } from '../../../domain/usecases/group/UpdateGroupUseCase';
import { DeleteGroupUseCase } from '../../../domain/usecases/group/DeleteGroupUseCase';
import { GetGroupUseCase } from '../../../domain/usecases/group/GetGroupUseCase';
import { ListGroupsUseCase } from '../../../domain/usecases/group/ListGroupsUseCase';
import { GroupValidatorImpl } from './GroupInputValidator';
import { GroupInputMapper } from './GroupInputMapper';
import { NotFoundException } from '@/adapters/errors/notfound.exception';

export class GroupController {
  private validator: GroupValidatorImpl;

  constructor(
    private createGroupUseCase: CreateGroupUseCase,
    private updateGroupUseCase: UpdateGroupUseCase,
    private deleteGroupUseCase: DeleteGroupUseCase,
    private getGroupUseCase: GetGroupUseCase,
    private listGroupsUseCase: ListGroupsUseCase,
  ) {
    this.validator = new GroupValidatorImpl();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    this.validator.validate(req);

    const result = await this.createGroupUseCase.execute(req.body);
    res.status(201).json(result);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const group = await this.updateGroupUseCase.execute(
      req.params.id,
      req.body,
    );

    if (!group) throw new NotFoundException('Group not found');
    res.status(204).json({});
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = await this.deleteGroupUseCase.execute(req.params.id);
    if (!id) throw new NotFoundException('Group not found');
    res.status(204).json({});
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const result = await this.getGroupUseCase.execute(req.params.id);
    if (!result) {
      throw new NotFoundException('Group not found');
    }
    res.json(result);
  };

  list = async (req: Request, res: Response): Promise<void> => {
    const groups = await this.listGroupsUseCase.execute();
    res.status(200).json(groups);
  };
}

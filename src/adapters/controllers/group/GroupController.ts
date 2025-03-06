import { Request, Response } from 'express';

import { GroupValidatorImpl } from './GroupInputValidator';
import { NotFoundException } from '@/adapters/errors/notfound.exception';
import { CreateGroupUseCasePort } from '@/domain/ports/input/usecases/group/create-group.port';
import { UpdateGroupUseCasePort } from '@/domain/ports/input/usecases/group/update-group.port';
import { DeleteGroupUseCasePort } from '@/domain/ports/input/usecases/group/delete-group.port';
import { GetGroupUseCasePort } from '@/domain/ports/input/usecases/group/get-group.port';
import { ListGroupUseCasePort } from '@/domain/ports/input/usecases/group/list-group.port';

export class GroupController {
  private validator: GroupValidatorImpl;

  constructor(
    private createGroupUseCase: CreateGroupUseCasePort,
    private updateGroupUseCase: UpdateGroupUseCasePort,
    private deleteGroupUseCase: DeleteGroupUseCasePort,
    private getGroupUseCase: GetGroupUseCasePort,
    private listGroupsUseCase: ListGroupUseCasePort,
  ) {
    this.validator = new GroupValidatorImpl();
  }

  public async create(req: Request, res: Response): Promise<void> {
    this.validator.validate(req);
    const result = await this.createGroupUseCase.execute(req.body);
    res.status(201).json(result);
  }

  public async update(req: Request, res: Response): Promise<void> {
    const group = await this.updateGroupUseCase.execute({
      id: req.params.id,
      data: {
        name: req.body.name,
      },
    });
    if (!group) throw new NotFoundException('Group not found');
    res.status(204).json({});
  }

  public async delete(req: Request, res: Response): Promise<void> {
    const id = await this.deleteGroupUseCase.execute({ id: req.params.id });
    if (!id) throw new NotFoundException('Group not found');
    res.status(204).json({});
  }

  public async getById(req: Request, res: Response): Promise<void> {
    const result = await this.getGroupUseCase.execute({
      id: req.params.id,
    });
    if (!result) throw new NotFoundException('Group not found');
    res.json(result);
  }

  public async list(req: Request, res: Response): Promise<void> {
    const groups = await this.listGroupsUseCase.execute();
    res.json(groups);
  }
}

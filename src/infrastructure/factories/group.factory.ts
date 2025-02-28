import { CreateGroupValidator } from '../../adapters/validators/group.validator';
import { GroupController } from '../../adapters/controllers/group.controller';
import { ICreateGroupUseCase } from '../../domain/ports/IGroupPorts';

export class GroupFactory {
  static createController(createGroupUseCase: ICreateGroupUseCase): GroupController {
    const validator = new CreateGroupValidator();
    return new GroupController(validator, createGroupUseCase);
  }
} 
import { GroupController } from '@/adapters/controllers/group/GroupController';
import { InMemoryGroupRepository } from '@/adapters/repositories/InMemoryGroupRepository';
import { CreateGroupUseCase } from '@/domain/usecases/group';
import { UpdateGroupUseCase } from '@/domain/usecases/group/update-group/update-group.usecase';
import { DeleteGroupUseCase } from '@/domain/usecases/group/delete-group/delete-group.usecase';
import { GetGroupUseCase } from '@/domain/usecases/group/get-group/get-group.usecase';
import { ListGroupsUseCase } from '@/domain/usecases/group/list-groups/list-groups.usecase';

export class GroupControllerFactory {
  static create(): GroupController {
    const repository = new InMemoryGroupRepository();

    return new GroupController(
      new CreateGroupUseCase(repository),
      new UpdateGroupUseCase(repository),
      new DeleteGroupUseCase(repository),
      new GetGroupUseCase(repository),
      new ListGroupsUseCase(repository),
    );
  }
}

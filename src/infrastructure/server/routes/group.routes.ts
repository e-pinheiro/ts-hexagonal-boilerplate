import { Router } from 'express';
import { GroupController } from '../../../adapters/controllers/group/GroupController';
import { asyncWrapper } from '../middlewares/asyncWrapper';
import { CreateGroupUseCase } from '@/domain/usecases/group/CreateGroupUseCase';
import { UpdateGroupUseCase } from '@/domain/usecases/group/UpdateGroupUseCase';
import { DeleteGroupUseCase } from '@/domain/usecases/group/DeleteGroupUseCase';
import { GetGroupUseCase } from '@/domain/usecases/group/GetGroupUseCase';
import { ListGroupsUseCase } from '@/domain/usecases/group/ListGroupsUseCase';
import { IGroupRepository } from '@/domain/ports/IGroupRepository';
import { InMemoryGroupRepository } from '@/adapters/repositories/InMemoryGroupRepository';

export const setupGroupRoutes = () => {
  const router = Router();

  const repository: IGroupRepository = new InMemoryGroupRepository();
  const createGroupUseCase: CreateGroupUseCase = new CreateGroupUseCase(
    repository,
  );
  const updateGroupUseCase: UpdateGroupUseCase = new UpdateGroupUseCase(
    repository,
  );
  const deleteGroupUseCase: DeleteGroupUseCase = new DeleteGroupUseCase(
    repository,
  );
  const getGroupUseCase: GetGroupUseCase = new GetGroupUseCase(repository);
  const listGroupsUseCase: ListGroupsUseCase = new ListGroupsUseCase(
    repository,
  );

  const groupController = new GroupController(
    createGroupUseCase,
    updateGroupUseCase,
    deleteGroupUseCase,
    getGroupUseCase,
    listGroupsUseCase,
  );

  router
    .route('/groups')
    .post(asyncWrapper(groupController.create))
    .get(asyncWrapper(groupController.list));

  router
    .route('/groups/:id')
    .get(asyncWrapper(groupController.getById))
    .patch(asyncWrapper(groupController.update))
    .delete(asyncWrapper(groupController.delete));

  return router;
};

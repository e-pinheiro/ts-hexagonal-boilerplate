import { Router, Request, Response } from 'express';

import { InMemoryGroupRepository } from '../../../adapters/repositories/InMemoryGroupRepository';
import { CreateGroupUseCase } from '../../../domain/usecases/group/CreateGroupUseCase';
import { UpdateGroupUseCase } from '../../../domain/usecases/group/UpdateGroupUseCase';
import { DeleteGroupUseCase } from '../../../domain/usecases/group/DeleteGroupUseCase';
import { GetGroupUseCase } from '../../../domain/usecases/group/GetGroupUseCase';
import { ListGroupsUseCase } from '../../../domain/usecases/group/ListGroupsUseCase';
import { GroupController } from '@/adapters/controllers/group/GroupController';

// Use dependency injection container or factory pattern
const setupGroupRoutes = (repository = new InMemoryGroupRepository()) => {
  const groupRouter = Router();

  const controller = new GroupController(
    new CreateGroupUseCase(repository),
    new UpdateGroupUseCase(repository),
    new DeleteGroupUseCase(repository),
    new GetGroupUseCase(repository),
    new ListGroupsUseCase(repository),
  );

  // Add async/await and error handling
  groupRouter.post('/groups', async (req: Request, res: Response) => {
    try {
      await controller.create(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  groupRouter.patch('/groups/:id', async (req: Request, res: Response) => {
    try {
      await controller.update(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  groupRouter.delete('/groups/:id', async (req: Request, res: Response) => {
    try {
      await controller.delete(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  groupRouter.get('/groups/:id', async (req: Request, res: Response) => {
    try {
      await controller.getById(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  groupRouter.get('/groups', async (req: Request, res: Response) => {
    try {
      await controller.list(req, res);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return groupRouter;
};

export { setupGroupRoutes };

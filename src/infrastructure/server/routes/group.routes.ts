import { Router } from 'express';
import { GroupControllerFactory } from '@/infrastructure/factories/GroupControllerFactory';
import { routeHandler } from '../middlewares/routeHandler';

export function setupGroupRoutes(): Router {
  const router = Router();
  const controller = GroupControllerFactory.create();

  router.post('/groups', routeHandler(controller.create.bind(controller)));
  router.get('/groups', routeHandler(controller.list.bind(controller)));
  router.get('/groups/:id', routeHandler(controller.getById.bind(controller)));
  router.patch('/groups/:id', routeHandler(controller.update.bind(controller)));
  router.delete(
    '/groups/:id',
    routeHandler(controller.delete.bind(controller)),
  );

  return router;
}

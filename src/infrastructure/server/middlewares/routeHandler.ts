import { Request, Response, NextFunction } from 'express';

export function routeHandler(controllerMethod: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controllerMethod(req, res);
    } catch (error) {
      next(error);
    }
  };
}

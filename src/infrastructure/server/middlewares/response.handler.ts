import { Request, Response, NextFunction } from 'express';

interface HttpResponse {
  success: boolean;
  data?: any;
  error?: string;
  statusCode: number;
}

declare global {
  namespace Express {
    interface Response {
      success(data: any, statusCode?: number): void;
      error(message: string, statusCode?: number): void;
    }
  }
}

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.success = function (data: any, statusCode: number = 200): void {
    res.status(statusCode).json(data);
  };

  res.error = function (message: string, statusCode: number = 500): void {
    const response: HttpResponse = {
      success: false,
      error: message,
      statusCode,
    };
    res.status(statusCode).json(response);
  };

  next();
};

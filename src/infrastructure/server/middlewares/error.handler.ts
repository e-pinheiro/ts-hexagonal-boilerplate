import { ErrorRequestHandler } from 'express';
import { ValidationError } from '@/adapters/errors/validation.error';
import { NotFoundError } from '@/adapters/errors/not-found.error';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req,
  res,
  next,
) => {
  if (error instanceof ValidationError) {
    console.error(error);
    res.status(400).json({
      error: 'Validation Error',
      details: error.details,
    });
    return;
  }

  if (error instanceof NotFoundError) {
    console.error(`Errp customizado de NotFound`);
    console.error(error);
    res.status(404).json({
      error: 'Not Found',
      message: error.message,
    });
    return;
  }

  console.error(error);
  res.status(500).json({
    error: 'Internal Server Error',
  });
};

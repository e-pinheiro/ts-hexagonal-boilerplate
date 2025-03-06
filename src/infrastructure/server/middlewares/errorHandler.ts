import { ErrorRequestHandler } from 'express';
import { ValidationException } from '@/adapters/errors/validation.exception';
import { NotFoundException } from '@/adapters/errors/not-found.exception';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req,
  res,
  next,
) => {
  if (error instanceof ValidationException) {
    console.error(error);
    res.status(400).json({
      error: 'Validation Error',
      details: error.details,
    });
    return;
  }

  if (error instanceof NotFoundException) {
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

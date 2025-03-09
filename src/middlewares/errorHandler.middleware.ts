import { Request, Response } from 'express';

import { CustomError } from '@adapters/error';

export const errorHandlerMiddleware = (err: CustomError, req: Request, res: Response) => {
  console.error(err.message);
  res.status(err.statusCode || 500).send({ message: err.message || 'Something went wrong' });
};

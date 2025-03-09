import Joi from 'joi';

import { NextFunction, Request, Response } from 'express';

export const validateQuery = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.query, { abortEarly: false });

    if (error) {
      res.status(400).json({ error: error.details.map(err => err.message) });
    }

    next();
  };
};

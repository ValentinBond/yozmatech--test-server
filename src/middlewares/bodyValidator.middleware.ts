import { Schema } from 'joi';

import { NextFunction, Response } from 'express';

import { RequestWithBody } from '@interfaces/request.interface';

const bodyValidator =
  (schema: Schema) => (req: RequestWithBody<any>, res: Response, next: NextFunction) => {
    const result = schema.validate(req.body);

    if (result.error) {
      const errorsList: Record<string, string> = {};

      result.error.details.forEach(item => {
        const key = item.context?.key;

        if (key) {
          errorsList[key] = item.message;
        }
      });

      res.status(400).json({ errors: errorsList });
    } else {
      next();
    }
  };

export default bodyValidator;

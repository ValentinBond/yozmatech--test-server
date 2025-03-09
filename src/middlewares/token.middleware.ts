import { NextFunction, Response } from 'express';

import { AuthRequest } from '@interfaces/request.interface';

import User from '@models/users.model';

import { verifyAccessToken } from '@utils/auth';

const tokenMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = (req.headers.authorization || '').split(' ')[1]?.trim();

    const jwtPayload = verifyAccessToken(token);

    if (typeof jwtPayload === 'string') {
      return;
    }

    const { exp, id } = jwtPayload;

    const user = await User.findOne({ _id: id });

    if (user && exp) {
      if (Date.now() < exp) {
        res.status(401).send('jwt expired');
      }

      req.user = user;

      return next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch {
    res.status(401).send('Unauthorized');
  }
};

export default tokenMiddleware;

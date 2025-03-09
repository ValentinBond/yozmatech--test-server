import { Request } from 'express';

import { IUser } from '@interfaces/users.interface';

export interface RequestWithQuery<T extends {}> extends Request {
  query: T;
}

export interface RequestWithBody<T extends {}> extends Request {
  body: T;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

import { NODE_ENV } from '@config';

import { NextFunction, Response } from 'express';

import { RequestWithBody } from '@interfaces/request.interface';
import { IUserLoginBody, IUserSignUpBody } from '@interfaces/users.interface';

import AuthService from '@services/auth.service';

class AuthController {
  public authService;

  constructor() {
    this.authService = new AuthService();
  }

  public login = async (
    req: RequestWithBody<IUserLoginBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { name, password } = req.body;

      const { accessToken, refreshToken } = await this.authService.login({ name, password });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        path: '/',
      });

      res.json({ token: accessToken });
    } catch (e) {
      next(e);
    }
  };

  public signUp = async (
    req: RequestWithBody<IUserSignUpBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { name, email, password } = req.body;

      const { accessToken, refreshToken } = await this.authService.register({
        name,
        email,
        password,
      });

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        path: '/',
      });

      res.status(201).json({ message: 'User registered successfully', token: accessToken });
    } catch (e) {
      next(e);
    }
  };

  public logout = async (
    req: RequestWithBody<IUserLoginBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      await this.authService.clearRefreshToken(refreshToken);

      res.clearCookie('refreshToken');
      res.status(200).json({ message: 'Logged out successfully' });
    } catch (e) {
      next(e);
    }
  };

  public refresh = async (
    req: RequestWithBody<IUserLoginBody>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const refToken = req.cookies.refreshToken;
      const { refreshToken, accessToken } = await this.authService.refresh(refToken);

      res.cookie('refreshToken', refreshToken, { httpOnly: true });

      res.json({ token: accessToken });
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;

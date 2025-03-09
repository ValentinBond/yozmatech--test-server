import { Router } from 'express';

import AuthController from '@controllers/auth.controller';

import { Routes } from '@interfaces/routes.interface';

import bodyValidator from '@middlewares/bodyValidator.middleware';

import { UserSchema, UserSignUpSchema } from '@validators/user.validator';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, bodyValidator(UserSchema), this.authController.login);
    this.router.post(`${this.path}/logout`, this.authController.logout);
    this.router.post(`${this.path}/refresh`, this.authController.refresh);
    this.router.post(
      `${this.path}/sign-up`,
      bodyValidator(UserSignUpSchema),
      this.authController.signUp,
    );
  }
}

export default AuthRoute;

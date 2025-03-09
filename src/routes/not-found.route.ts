import { Router } from 'express';

import NotFoundController from '@controllers/not-found.controller';

import { Routes } from '@interfaces/routes.interface';

class NotFoundRoute implements Routes {
  public path = '*';
  public router = Router();
  public notFoundController = new NotFoundController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.notFoundController.index);
  }
}

export default NotFoundRoute;

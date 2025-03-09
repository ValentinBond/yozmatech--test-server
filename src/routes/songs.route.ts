import { Router } from 'express';

import SongsController from '@controllers/songs.controller';

import { Routes } from '@interfaces/routes.interface';

import { validateQuery } from '@middlewares/queryValidator.middleware';
import tokenMiddleware from '@middlewares/token.middleware';

import { songsQuerySchema } from '@validators/songs.validator';

class SongsRoute implements Routes {
  public path = '/songs';
  public router = Router();
  public songsController = new SongsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/search`,
      tokenMiddleware,
      validateQuery(songsQuerySchema),
      this.songsController.searchSongs,
    );
    this.router.post(`${this.path}/favorites`, tokenMiddleware, this.songsController.addFavorite);
    this.router.get(`${this.path}/favorites`, tokenMiddleware, this.songsController.getFavorites);
  }
}

export default SongsRoute;

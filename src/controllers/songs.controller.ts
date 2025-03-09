import { NextFunction, Response } from 'express';

import { AuthRequest } from '@interfaces/request.interface';
import { SongsQueryParams } from '@interfaces/songs.interface';

import SongsService from '@services/songs.service';

import { CustomError } from '@adapters/error';

class SongsController {
  public songsService;

  constructor() {
    this.songsService = new SongsService();
  }

  public addFavorite = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { songId } = req.body;

      if (!req?.user) {
        throw new CustomError({ statusCode: 401, message: 'Unauthorized' });
      }

      const message = await this.songsService.addFavorite({ userId: req.user.id, songId });

      res.json({ message });
    } catch (e) {
      next(e);
    }
  };

  public getFavorites = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      if (!req?.user) {
        throw new CustomError({ statusCode: 401, message: 'Unauthorized' });
      }

      const favorites = await this.songsService.getFavorites(req?.user.id);

      res.json({ favorites });
    } catch (e) {
      next(e);
    }
  };

  public searchSongs = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const {
        query,
        sortBy,
        order = 'asc',
        page = '1',
        limit = '10',
        onlyFavorites,
      } = req.query as SongsQueryParams;

      if (!req?.user) {
        throw new CustomError({ statusCode: 401, message: 'Unauthorized' });
      }

      const result = await this.songsService.searchSongs({
        query,
        sortBy,
        order,
        page,
        limit,
        userId: req.user.id,
        onlyFavorites,
      });

      res.json(result);
    } catch (e) {
      next(e);
    }
  };
}

export default SongsController;

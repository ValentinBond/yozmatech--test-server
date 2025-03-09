import { FilterQuery, SortOrder } from 'mongoose';

import { IFavoriteBody } from '@interfaces/favorite.interface';
import { ISong, SongsQueryParams } from '@interfaces/songs.interface';

import { Favorite } from '@models/favorite.model';
import { SearchHistory } from '@models/search-history.model';
import { Song } from '@models/songs.model';

class SongsService {
  public async addFavorite({ userId, songId }: IFavoriteBody & { userId: string }) {
    const exists = await Favorite.findOne({ userId, songId });

    if (exists) {
      return 'Song is already in favorites.';
    }

    return await Favorite.create({ userId, songId });
  }

  public async getFavorites(userId: string) {
    return await Favorite.find({ userId }).populate('songId');
  }

  public async searchSongs({
    query,
    sortBy,
    order = 'asc',
    page = '1',
    limit = '10',
    userId,
    onlyFavorites,
  }: SongsQueryParams & { userId: string }) {
    if (query) {
      const existingQuery = await SearchHistory.findOne({ userId, query });

      if (!existingQuery) {
        await SearchHistory.create({ userId, query });
      }
    }

    let filter = {} as FilterQuery<ISong>;

    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: 'i' } },
        { artist: { $regex: query, $options: 'i' } },
        { album: { $regex: query, $options: 'i' } },
      ];
    }

    const favoriteSongs = await Favorite.find({ userId }).select('songId');
    const favoriteSongIds = new Set(favoriteSongs.map(fav => fav.songId.toString()));

    if (onlyFavorites === 'true') {
      filter._id = { $in: Array.from(favoriteSongIds) };
    }

    let sortOptions = {} as Record<string, SortOrder>;

    if (sortBy) {
      sortOptions[sortBy] = order === 'desc' ? -1 : 1;
    }

    const pageNumber = parseInt(page, 10) || 1;
    const pageSize = parseInt(limit, 10) || 10;
    const skip = (pageNumber - 1) * pageSize;

    const songs = await Song.find(filter).sort(sortOptions).skip(skip).limit(pageSize);
    const totalSongs = await Song.countDocuments(filter);

    const songsWithFavorites = songs.map(song => ({
      ...song.toObject(),
      isFavorite: favoriteSongIds.has(song._id.toString()),
    }));

    return {
      page: pageNumber,
      limit: pageSize,
      totalItems: totalSongs,
      totalPages: Math.ceil(totalSongs / pageSize),
      data: songsWithFavorites,
    };
  }
}

export default SongsService;

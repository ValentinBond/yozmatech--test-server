import mongoose from 'mongoose';

export interface IFavorite {
  userId: mongoose.Types.ObjectId;
  songId: mongoose.Types.ObjectId;
}

export interface IFavoriteBody {
  songId: string;
}

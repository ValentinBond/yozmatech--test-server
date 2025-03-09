import mongoose, { Schema } from 'mongoose';

import { IFavorite } from '@interfaces/favorite.interface';

const FavoriteSchema = new Schema<IFavorite>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  songId: { type: Schema.Types.ObjectId, ref: 'Song', required: true },
});

export const Favorite = mongoose.model<IFavorite>('Favorite', FavoriteSchema);

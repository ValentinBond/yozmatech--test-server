import mongoose, { Schema } from 'mongoose';

import { ISearchHistory } from '@interfaces/searchHistory.interface';

const SearchHistorySchema = new Schema<ISearchHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    query: { type: String, required: true },
  },
  { timestamps: true },
);

export const SearchHistory = mongoose.model<ISearchHistory>('SearchHistory', SearchHistorySchema);

import mongoose from 'mongoose';

export interface ISearchHistory {
  userId: mongoose.Types.ObjectId;
  query: string;
}

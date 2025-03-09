import mongoose, { Schema } from 'mongoose';

import { ISong } from '@interfaces/songs.interface';

const SongSchema = new Schema<ISong>({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
});

export const Song = mongoose.model<ISong>('Song', SongSchema);

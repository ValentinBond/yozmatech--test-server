import mongoose, { Schema } from 'mongoose';

import { IUser } from '@interfaces/users.interface';

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);

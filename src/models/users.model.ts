import { Document, Schema, model } from 'mongoose';

import { IUser } from '@interfaces/users.interface';

const userSchema = new Schema({
  name: String,
  password: String,
  salt: String,
  refreshToken: { type: String, default: null },
});

const userModel = model<IUser & Document>('User', userSchema);

export default userModel;

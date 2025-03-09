import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '@config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import { IUserLoginBody, IUserSignUpBody } from '@interfaces/users.interface';

import userModel from '@models/users.model';

import { CustomError } from '@adapters/error';

import {
  generateAccessToken,
  generateRefreshToken,
  validPassword,
  verifyRefreshToken,
} from '@utils/auth';

class AuthService {
  user = userModel;

  public generatePassword = (password: string) => {
    const salt = crypto.randomBytes(32).toString('hex');
    const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
      salt: salt,
      hash: genHash,
    };
  };

  public login = async ({ name, password }: IUserLoginBody) => {
    if (!name || !password) {
      throw new CustomError({ message: 'Please add all fields', statusCode: 400 });
    }

    const user = await this.user.findOne({ name });

    if (!user) {
      throw new CustomError({ message: 'User not found', statusCode: 404 });
    }

    if (user && validPassword({ password, hash: user.password, salt: user.salt })) {
      const accessToken = generateAccessToken(user.id);

      const refreshToken = generateRefreshToken(user.id);

      user.refreshToken = refreshToken;
      await user.save();
      return { accessToken, refreshToken };
    } else {
      throw new CustomError({ message: 'Invalid credentials', statusCode: 400 });
    }
  };

  public async register(userData: IUserSignUpBody) {
    const { name, email, password } = userData;

    const existingUser = await this.user.findOne({ email });

    if (existingUser) {
      throw new CustomError({ message: 'User already exists', statusCode: 409 });
    }

    const { hash: hashedPassword, salt } = this.generatePassword(password);

    const user = await this.user.create({
      name,
      email,
      password: hashedPassword,
      salt,
      refreshToken: null,
    });

    const accessToken = jwt.sign({ id: user._id }, JWT_SECRET!, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });

    user.refreshToken = refreshToken;

    await user.save();

    return { user, accessToken, refreshToken };
  }

  public clearRefreshToken = async (refreshToken: string) => {
    if (refreshToken) {
      const payload = verifyRefreshToken(refreshToken) as jwt.JwtPayload;
      const user = await this.user.findById(payload.id);

      if (user) {
        user.refreshToken = null;
        await user.save();
      }
    }
  };

  public refresh = async (token: string) => {
    if (!token) throw new CustomError({ message: 'Invalid refresh token', statusCode: 400 });

    try {
      const payload = verifyRefreshToken(token) as jwt.JwtPayload;
      const user = await this.user.findById(payload.id);

      if (!user) {
        throw new CustomError({ message: 'Invalid refresh token', statusCode: 400 });
      }

      const accessToken = generateAccessToken(user.id);
      const refreshToken = generateRefreshToken(user.id);

      user.refreshToken = refreshToken;
      await user.save();

      return {
        accessToken,
        refreshToken,
      };
    } catch {
      throw new CustomError({ message: 'Invalid refresh token', statusCode: 400 });
    }
  };
}

export default AuthService;

import { JWT_SECRET, REFRESH_TOKEN_SECRET } from '@config';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const generateAccessToken = (id: string) => {
  if (!JWT_SECRET) throw Error("JWT_SECRET isn't provided");

  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' });
};

export const generateRefreshToken = (id: string) => {
  if (!REFRESH_TOKEN_SECRET) throw Error("REFRESH_TOKEN_SECRET isn't provided");

  return jwt.sign({ id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string) => {
  if (!JWT_SECRET) throw Error("JWT_SECRET isn't provided");
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  if (!REFRESH_TOKEN_SECRET) throw Error("REFRESH_TOKEN_SECRET isn't provided");

  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};

export const generatePassword = (password: string) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

  return {
    salt: salt,
    hash: genHash,
  };
};

export const validPassword = ({
  password,
  salt,
  hash,
}: {
  password: string;
  hash: string;
  salt: string;
}) => {
  const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return hash === checkHash;
};

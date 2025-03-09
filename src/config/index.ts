import { config } from 'dotenv';

config({ path: '.env' });

export const { NODE_ENV, PORT, MONGO_URI, DB_NAME, JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

import { DB_NAME, MONGO_URI } from '@config';

const URL = `${MONGO_URI}${DB_NAME}` || 'mongodb://localhost:27017/songs';

export const dbConnection = {
  url: URL,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

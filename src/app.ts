import { NODE_ENV, PORT } from '@config';
import { dbConnection } from '@db';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connect, set } from 'mongoose';

import express from 'express';

import { Routes } from '@interfaces/routes.interface';

import { errorHandlerMiddleware } from '@middlewares/errorHandler.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 4000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  private async connectToDatabase() {
    if (this.env !== 'production') {
      set('debug', true);
    }

    await connect(dbConnection.url)
      .then(() => {
        console.log('DB connected successfully!');
      })
      .catch((e: Error) => {
        console.log('Error database connection:', e);
      });
  }

  private initializeMiddlewares() {
    const corsOptions = {
      origin: '*',
      credentials: true,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      bodyParser.urlencoded({
        extended: true,
      }),
    );
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
    this.app.use(errorHandlerMiddleware);
  }
}

export default App;

import { CustomError } from '@adapters/error';

class NotFoundController {
  public index = () => {
    throw new CustomError({ message: 'Route not found', statusCode: 404 });
  };
}

export default NotFoundController;

export class CustomError extends Error {
  statusCode = 500;

  constructor({ message, statusCode }: { message: string; statusCode: number }) {
    super(message);

    this.statusCode = statusCode;
  }
}

import { CustomError } from "./custom-errors";

export class UnauthorizedError extends CustomError {
  statusCode = 401;

  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }

  serializeErrors() {
    return [{ status: 401, message: this.message }];
  }
}

import { CustomError } from "./custom-errors";

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string) {
    super("Route not found");
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ status: this.statusCode, message: this.message }];
  }
}

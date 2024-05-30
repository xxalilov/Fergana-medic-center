"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const custom_errors_1 = require("./custom-errors");
class NotFoundError extends custom_errors_1.CustomError {
    constructor(message) {
        super("Route not found");
        this.message = message;
        this.statusCode = 404;
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{ status: this.statusCode, message: this.message }];
    }
}
exports.NotFoundError = NotFoundError;

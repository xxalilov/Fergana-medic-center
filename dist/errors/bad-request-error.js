"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const custom_errors_1 = require("./custom-errors");
class BadRequestError extends custom_errors_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
    serializeErrors() {
        return [{ status: 400, message: this.message }];
    }
}
exports.BadRequestError = BadRequestError;

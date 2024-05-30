"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedError = void 0;
const custom_errors_1 = require("./custom-errors");
class UnauthorizedError extends custom_errors_1.CustomError {
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 401;
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
    serializeErrors() {
        return [{ status: 401, message: this.message }];
    }
}
exports.UnauthorizedError = UnauthorizedError;

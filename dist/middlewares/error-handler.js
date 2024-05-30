"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_errors_1 = require("../errors/custom-errors");
const errorHandler = (err, req, res, next) => {
    console.log(err);
    if (err instanceof custom_errors_1.CustomError) {
        return res.status(err.statusCode).json({ errors: err.serializeErrors() });
    }
    res.status(400).json({
        errors: [{ message: "Something went wrong" }],
    });
};
exports.errorHandler = errorHandler;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInValidator = void 0;
const express_validator_1 = require("express-validator");
exports.signInValidator = [
    (0, express_validator_1.body)("login").isString().withMessage("Please input your login"),
    (0, express_validator_1.body)("password").isString().withMessage("Please input your password"),
];

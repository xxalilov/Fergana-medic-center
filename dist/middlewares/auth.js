"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = exports.doctorProtect = exports.adminProtect = exports.superadmin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const async_1 = require("./async");
const unauthorized_error_1 = require("../errors/unauthorized-error");
const config_1 = __importDefault(require("../config/config"));
exports.superadmin = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = getToken(req);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        if (decoded.role == "superadmin") {
            req.user = decoded;
            next();
        }
        else {
            throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
        }
    }
    catch (err) {
        throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
    }
}));
exports.adminProtect = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = getToken(req);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        if (decoded.role == "admin" ||
            decoded.role == "superadmin" ||
            decoded.role == "cachier") {
            req.user = decoded;
            next();
        }
        else {
            throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
        }
    }
    catch (err) {
        throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
    }
}));
exports.doctorProtect = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = getToken(req);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        if (decoded.role == "superadmin" || decoded.role == "user") {
            req.user = decoded;
            next();
        }
        else {
            throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
        }
    }
    catch (err) {
        throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
    }
}));
exports.protect = (0, async_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = getToken(req);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
    }
}));
function getToken(req) {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    else if (req.cookies.token) {
        token = req.cookies.token;
    }
    if (!token) {
        throw new unauthorized_error_1.UnauthorizedError("No authorize to access this route");
    }
    return token;
}

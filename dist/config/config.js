"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../config/config.env") });
const getConfig = () => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        DB_NAME: process.env.DB_NAME,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        ADMIN_LOGIN: process.env.ADMIN_LOGIN,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRE: process.env.JWT_EXPIRE,
        JWT_COOKIE_EXPIRE: process.env.JWT_COOKIE_EXPIRE,
    };
};
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
exports.default = sanitizedConfig;

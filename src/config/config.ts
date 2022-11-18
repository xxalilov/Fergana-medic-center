import path from "path";
import dotenv from "dotenv";

dotenv.config({path: path.resolve(__dirname, "../config/config.env")});

interface ENV {
    NODE_ENV: string | undefined;
    PORT: string | undefined;
    DB_NAME: string | undefined;
    DB_USERNAME: string | undefined;
    DB_PASSWORD: string | undefined;
    ADMIN_LOGIN: string | undefined;
    ADMIN_PASSWORD: string | undefined;
    JWT_SECRET: string | undefined;
    JWT_EXPIRE: string | undefined;
    JWT_COOKIE_EXPIRE: string | undefined;
}

interface Config {
    NODE_ENV: string;
    PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    ADMIN_LOGIN: string;
    ADMIN_PASSWORD: string;
    JWT_SECRET: string;
    JWT_EXPIRE: string;
    JWT_COOKIE_EXPIRE: string;
}

const getConfig = (): ENV => {
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

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

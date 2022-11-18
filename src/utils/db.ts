import {Sequelize} from 'sequelize';
import config from "../config/config";

const sequelize = new Sequelize(config.DB_NAME, config.DB_USERNAME, config.DB_PASSWORD, {
    dialect: "postgres",
    host: "localhost"
});

export default sequelize;
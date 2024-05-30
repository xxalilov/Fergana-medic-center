"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
class Statistic extends sequelize_1.Model {
}
Statistic.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    users: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    balance: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
    patients: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    tableName: "statistic",
    sequelize: db_1.default
});
exports.default = Statistic;

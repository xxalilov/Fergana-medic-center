"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
class Room extends sequelize_1.Model {
}
Room.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    roomNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    roomFee: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    isFull: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    patientsCount: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
    maxPatientsCount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "room",
    sequelize: db_1.default,
});
exports.default = Room;

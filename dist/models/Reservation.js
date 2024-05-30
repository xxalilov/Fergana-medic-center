"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
class Reservation extends sequelize_1.Model {
}
Reservation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    fee: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    room: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    queue: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    isQueue: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    isPaid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    paymentType: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        values: ['card', 'cash'],
    },
    doctor: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    doctorName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cashier: {
        type: sequelize_1.DataTypes.UUID,
    }
}, {
    tableName: "reservation",
    sequelize: db_1.default
});
exports.default = Reservation;

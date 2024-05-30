"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
class RoomReservation extends sequelize_1.Model {
}
RoomReservation.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    roomNumber: {
        type: sequelize_1.DataTypes.STRING
    },
    fee: {
        type: sequelize_1.DataTypes.INTEGER
    },
    paymentType: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        values: ['card', 'cash'],
    },
    isPaid: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    },
    soreId: {
        type: sequelize_1.DataTypes.UUID
    }
}, {
    tableName: "roomreservation",
    sequelize: db_1.default
});
exports.default = RoomReservation;

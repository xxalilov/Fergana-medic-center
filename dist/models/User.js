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
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../utils/db"));
const password_1 = require("../utils/password");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    login: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    birthday: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    degree: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    workExperience: sequelize_1.DataTypes.STRING,
    image: sequelize_1.DataTypes.STRING,
    profession: sequelize_1.DataTypes.STRING,
    consultationFee: sequelize_1.DataTypes.STRING,
    salary: sequelize_1.DataTypes.STRING,
    room: {
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: "user",
        allowNull: false,
    },
    soreQueue: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    tableName: "users",
    sequelize: db_1.default,
});
User.beforeCreate((user, option) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield password_1.Password.toHash(user.password);
    user.password = hashedPassword;
}));
exports.default = User;

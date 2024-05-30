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
const slug_1 = __importDefault(require("slug"));
const db_1 = __importDefault(require("../utils/db"));
class Category extends sequelize_1.Model {
}
Category.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    tableName: "category",
    sequelize: db_1.default,
});
Category.beforeSave((category) => __awaiter(void 0, void 0, void 0, function* () {
    category.slug = (0, slug_1.default)(category.category);
}));
exports.default = Category;

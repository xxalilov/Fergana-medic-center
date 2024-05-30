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
const db_1 = __importDefault(require("./db"));
const Sore_1 = __importDefault(require("../models/Sore"));
const Reservation_1 = __importDefault(require("../models/Reservation"));
const db = function () {
    return __awaiter(this, void 0, void 0, function* () {
        Sore_1.default.hasMany(Reservation_1.default, {
            sourceKey: "id",
            foreignKey: "soreId",
            as: "reservation",
        });
        Reservation_1.default.belongsTo(Sore_1.default, {
            foreignKey: "soreId",
            as: "sore",
        });
        try {
            yield db_1.default.sync({ force: false });
            console.log("Connected Postgres!");
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.default = db;

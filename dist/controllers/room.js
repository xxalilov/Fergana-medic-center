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
exports.deleteRoom = exports.updateRoomForAdmin = exports.updateRoom = exports.getRooms = exports.createRoom = void 0;
const sequelize_1 = require("sequelize");
const Room_1 = __importDefault(require("../models/Room"));
const controller_1 = require("./controller");
exports.createRoom = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield Room_1.default.create(req.body);
    yield room.save();
    res.status(201).json({
        status: 201,
        data: room,
    });
}));
exports.getRooms = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    let users, allPages;
    let countData = 0;
    if (query.isFull) {
        const { count, rows } = yield Room_1.default.findAndCountAll({
            where: { isFull: query.isFull },
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        users = rows;
    }
    else if (req.query.notNull) {
        const { count, rows } = yield Room_1.default.findAndCountAll({
            where: { patientsCount: { [sequelize_1.Op.gt]: 0 } },
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        users = rows;
    }
    else {
        const { count, rows } = yield Room_1.default.findAndCountAll({
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        users = rows;
    }
    res.status(200).json({
        status: 200,
        allPages,
        count: countData,
        page,
        data: users,
    });
}));
exports.updateRoom = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield Room_1.default.findOne({ where: { id: req.params.id } });
    if (!room)
        throw new controller_1.NotFoundError("Berilgan id orqali xona topilmadi.");
    yield room.update(req.body);
    res.status(200).json({
        status: 200,
        data: room,
    });
}));
exports.updateRoomForAdmin = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield Room_1.default.findOne({ where: { id: req.params.id } });
    if (!room)
        throw new controller_1.NotFoundError("Berilgan id orqali xona topilmadi.");
    yield room.update({ patientsCount: room.patientsCount - 1, isFull: false });
    res.status(200).json({
        status: 200,
        data: room,
    });
}));
exports.deleteRoom = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield Room_1.default.findOne({ where: { id: req.params.id } });
    if (!room)
        throw new controller_1.BadRequestError("Something went wrong");
    yield room.destroy();
    res.status(200).json({
        status: 200,
        data: {},
    });
}));

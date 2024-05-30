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
exports.updateRoomReservation = exports.updateReservation = exports.getStatistics = exports.updateReservationForDoctor = exports.getReservationForDoctor = exports.getReservations = void 0;
const RoomReservation_1 = __importDefault(require("../models/RoomReservation"));
const controller_1 = require("./controller");
exports.getReservations = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation = yield controller_1.Reservation.findAll({
        where: { soreId: req.params.id },
    });
    res.status(200).json({
        status: 200,
        data: reservation,
    });
}));
exports.getReservationForDoctor = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reservation = yield controller_1.Reservation.findAll({
        where: { doctor: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, isPaid: true, isQueue: true },
        include: [{ model: controller_1.Sore, as: "sore", attributes: ["name", "phone"] }],
        order: [["queue", "ASC"]],
    });
    res.status(200).json({
        status: 200,
        data: reservation,
    });
}));
exports.updateReservationForDoctor = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation = yield controller_1.Reservation.findOne({
        where: { id: req.params.id },
    });
    if (!reservation)
        throw new controller_1.BadRequestError("Something went wrong.");
    let statistic = yield controller_1.Statistic.findOne();
    if (!statistic) {
        statistic = yield controller_1.Statistic.create({ balance: 1 });
        yield statistic.save();
    }
    statistic.update({ balance: statistic.balance + reservation.fee });
    yield reservation.update(req.body);
    yield reservation.save();
    res.status(200).json({
        status: 200,
        data: reservation,
    });
}));
exports.getStatistics = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statistic = yield controller_1.Statistic.findOne();
    const category = yield controller_1.Category.findAll();
    let categories = [];
    let catDatas = [];
    category.map((cat) => __awaiter(void 0, void 0, void 0, function* () {
        yield categories.push(cat.category);
    }));
    for (let index in categories) {
        const length = yield controller_1.Reservation.count({
            where: { type: categories[index] },
        });
        yield catDatas.push(length);
    }
    res.status(200).json({
        status: 200,
        data: { statistic, categories, catDatas },
    });
}));
exports.updateReservation = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation = yield controller_1.Reservation.findOne({
        where: { id: req.params.id },
    });
    if (!reservation)
        throw new controller_1.BadRequestError("Something went wrong.");
    const user = yield controller_1.User.findOne({ where: { id: reservation.doctor } });
    if (!user)
        throw new controller_1.NotFoundError("User not found.");
    const queue = user.soreQueue;
    const setQueue = queue + 1;
    yield user.update({ soreQueue: setQueue });
    yield user.save();
    req.body.queue = setQueue;
    yield reservation.update(req.body);
    yield reservation.save();
    res.status(200).json({
        status: 200,
        data: reservation,
    });
}));
exports.updateRoomReservation = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reservation = yield RoomReservation_1.default.findOne({
        where: { id: req.params.id },
    });
    if (!reservation)
        throw new controller_1.BadRequestError("Something went wrong.");
    let statistic = yield controller_1.Statistic.findOne();
    if (!statistic) {
        statistic = yield controller_1.Statistic.create({ balance: reservation.fee });
        yield statistic.save();
    }
    statistic.update({ balance: statistic.balance + reservation.fee });
    yield reservation.update(req.body);
    yield reservation.save();
    yield reservation.update(req.body);
    yield reservation.save();
    const patient = yield controller_1.User.findOne({ where: { id: reservation.soreId } });
    res.status(200).json({
        status: 200,
        data: reservation
    });
}));

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
exports.deleteSore = exports.updateSore = exports.getSore = exports.getSoresForDoctors = exports.getSoresForCachier = exports.getSores = exports.createSoreToRoom = exports.createSoreToDoctor = exports.createSore = void 0;
const Room_1 = __importDefault(require("../models/Room"));
const RoomReservation_1 = __importDefault(require("../models/RoomReservation"));
const controller_1 = require("./controller");
exports.createSore = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sore = yield controller_1.Sore.findOne({ where: { phone: req.body.phone } });
    if (sore)
        throw new controller_1.BadRequestError("Bemor allaqachon ro'yhatdan o'tgan.");
    const soreCount = yield controller_1.Sore.count();
    req.body.idNumber = soreCount + 1;
    const newSore = yield controller_1.Sore.create(req.body);
    yield newSore.save();
    const statistic = yield controller_1.Statistic.findOne();
    if (!statistic)
        yield controller_1.Statistic.create({ patients: 1 });
    statistic === null || statistic === void 0 ? void 0 : statistic.update({ patients: statistic.patients + 1 });
    res.status(201).json({
        status: 200,
        data: newSore,
    });
}));
exports.createSoreToDoctor = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sore = yield controller_1.Sore.findOne({ where: { phone: req.body.phone } });
    if (sore && !req.body.reApply)
        throw new controller_1.BadRequestError("Bemor allaqachon ro'yhatdan o'tgan.");
    const user = yield controller_1.User.findOne({ where: { id: req.params.id } });
    if (!user)
        throw new controller_1.NotFoundError("User not found.");
    const soreCount = yield controller_1.Sore.count();
    req.body.idNumber = soreCount + 1;
    req.body.room = user.room;
    req.body.fee = user.consultationFee;
    req.body.doctor = user.id;
    req.body.doctorName = user.name;
    req.body.type = user.profession;
    req.body.room = user.room;
    if (!sore) {
        sore = yield controller_1.Sore.create(req.body);
        yield sore.save();
        const statistic = yield controller_1.Statistic.findOne();
        if (!statistic)
            yield controller_1.Statistic.create({ patients: 1 });
        statistic === null || statistic === void 0 ? void 0 : statistic.update({ patients: statistic.patients + 1 });
    }
    const reservation = yield sore.createReservation(req.body);
    yield reservation.save();
    const data = yield controller_1.Sore.findOne({
        where: { id: sore.id },
        include: [
            { model: controller_1.Reservation, as: "reservation", where: { isPaid: false } },
        ],
    });
    res.status(201).json({
        status: 201,
        data,
    });
}));
exports.createSoreToRoom = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let sore = yield controller_1.Sore.findOne({ where: { phone: req.body.phone } });
    if (sore && !req.body.reApply)
        throw new controller_1.BadRequestError("Bemor allaqachon ro'yhatdan o'tgan.");
    const room = yield Room_1.default.findOne({ where: { id: req.params.id } });
    if (!room)
        throw new controller_1.NotFoundError("Xona topilmadi.");
    const soreCount = yield controller_1.Sore.count();
    req.body.idNumber = soreCount + 1;
    if (req.body.fullBooking) {
        yield room.update({ isFull: true, patientsCount: room.patientsCount + 1 });
        req.body.fee = room.maxPatientsCount * room.roomFee * Number(req.body.days);
    }
    else if (req.body.booking) {
        if (room.patientsCount + 1 == room.maxPatientsCount) {
            yield room.update({ patientsCount: room.patientsCount + 1, isFull: true });
        }
        else {
            yield room.update({ patientsCount: room.patientsCount + 1 });
        }
        req.body.fee = room.roomFee * Number(req.body.days);
    }
    req.body.roomNumber = room.roomNumber;
    if (!sore) {
        sore = yield controller_1.Sore.create(req.body);
        yield sore.save();
        const statistic = yield controller_1.Statistic.findOne();
        if (!statistic)
            yield controller_1.Statistic.create({ patients: 1 });
        statistic === null || statistic === void 0 ? void 0 : statistic.update({ patients: statistic.patients + 1 });
    }
    req.body.soreId = sore.id;
    const reservation = yield RoomReservation_1.default.create(req.body);
    yield reservation.save();
    res.status(201).json({
        status: 201,
        data: {
            sore,
            reservation
        }
    });
}));
exports.getSores = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    let patients, allPages;
    let countData = 0;
    if (query.phone) {
        const { count, rows } = yield controller_1.Sore.findAndCountAll({
            where: { phone: query.phone },
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        patients = rows;
    }
    else {
        const { count, rows } = yield controller_1.Sore.findAndCountAll({
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        patients = rows;
    }
    res.status(200).json({
        status: 200,
        allPages,
        count: countData,
        page,
        data: patients,
    });
}));
exports.getSoresForCachier = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let query;
    if (req.query) {
        query = req.query;
    }
    let sore = yield controller_1.Sore.findOne({
        where: query,
        include: [
            { model: controller_1.Reservation, as: "reservation", where: { isPaid: false } },
        ],
    });
    if (!sore) {
        sore = yield controller_1.Sore.findOne({ where: query });
    }
    if (!sore)
        throw new controller_1.NotFoundError("Bemor topilmadi.");
    const roomReservation = yield RoomReservation_1.default.findAll({ where: { soreId: sore.id, isPaid: false } });
    console.log(roomReservation);
    res.status(200).json({
        status: 200,
        data: { sore, roomReservation },
    });
}));
exports.getSoresForDoctors = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let query;
    if (req.query) {
        query = req.query;
    }
    let sore = yield controller_1.Sore.findAll({
        include: [
            {
                model: controller_1.Reservation,
                as: "reservation",
                where: { doctor: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, isPaid: true, isQueue: true },
            },
        ],
    });
    if (!sore)
        throw new controller_1.NotFoundError("Bemor topilmadi.");
    res.status(200).json({
        status: 200,
        data: sore,
    });
}));
exports.getSore = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sore = yield controller_1.Sore.findOne({ where: { id: req.params.id } });
    if (!sore)
        throw new controller_1.NotFoundError("Bemor topilmadi.");
    res.status(200).json({
        status: 200,
        data: sore,
    });
}));
exports.updateSore = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sore = yield controller_1.Sore.findOne({ where: { id: req.params.id } });
    if (!sore)
        throw new controller_1.NotFoundError("Something went wrong.");
    yield sore.update(req.body);
    yield sore.save();
    res.status(200).json({
        status: 200,
        data: sore,
    });
}));
exports.deleteSore = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sore = yield controller_1.Sore.findOne({ where: { id: req.params.id } });
    if (!sore)
        throw new controller_1.NotFoundError("Something went wrong.");
    yield sore.destroy();
    const statistic = yield controller_1.Statistic.findOne();
    statistic === null || statistic === void 0 ? void 0 : statistic.update({ patients: statistic.patients - 1 });
    res.status(200).json({
        status: 200,
        data: {},
    });
}));

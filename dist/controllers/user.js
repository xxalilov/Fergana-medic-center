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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUsersLoginAndPassword = exports.updateUserDetails = exports.getUsersForAdmin = exports.getAllUsers = exports.createUser = void 0;
const controller_1 = require("./controller");
exports.createUser = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield controller_1.User.findOne({ where: { login: req.body.login } });
    if (currentUser) {
        throw new controller_1.BadRequestError("Login already existing.");
    }
    if (req.file) {
        req.body.image = req.file.path;
    }
    const user = yield controller_1.User.create(req.body);
    yield user.save();
    const statistic = yield controller_1.Statistic.findOne();
    if (!statistic)
        yield controller_1.Statistic.create({ users: 1 });
    statistic === null || statistic === void 0 ? void 0 : statistic.update({ users: statistic.users + 1 });
    res.status(201).json({
        status: 201,
        data: user,
    });
}));
exports.getAllUsers = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const limit = Number(query.limit) || 3;
    const page = Number(query.page) || 1;
    let users, allPages;
    let countData = 0;
    if (query.role && query.profession) {
        let prof = query.profession && query.profession;
        let role = query.role && query.role;
        const { count, rows } = yield controller_1.User.findAndCountAll({
            where: { profession: prof, role: role },
            attributes: { exclude: ["password"] },
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        users = rows;
    }
    else if (query.role) {
        let role = query.role;
        const { count, rows } = yield controller_1.User.findAndCountAll({
            where: { role: role },
            attributes: { exclude: ["password"] },
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        users = rows;
    }
    else if (query.profession) {
        let prof = query.profession;
        const { count, rows } = yield controller_1.User.findAndCountAll({
            where: { profession: prof },
            attributes: { exclude: ["password"] },
            offset: limit * page - limit,
            limit: limit,
        });
        countData = countData + count;
        allPages = Math.ceil(count / limit);
        users = rows;
    }
    else {
        const { count, rows } = yield controller_1.User.findAndCountAll({
            offset: limit * page - limit,
            attributes: { exclude: ["password"] },
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
exports.getUsersForAdmin = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const user = yield controller_1.User.findAll({
        where: query,
        attributes: { exclude: ["password", "login", "image"] },
    });
    res.status(200).json({
        status: 200,
        data: user,
    });
}));
// Update User Details
exports.updateUserDetails = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield controller_1.User.findOne({ where: { id: req.params.id } });
    if (!user)
        throw new controller_1.BadRequestError("User not found");
    if (req.body.password) {
        req.body.password = yield controller_1.Password.toHash(req.body.password);
    }
    if (user.role == "superadmin" && req.body.role !== "superadmin") {
        throw new controller_1.BadRequestError("You can't change Superadmin Role.");
    }
    if (req.file) {
        if (user.image)
            (0, controller_1.deleteFile)(user.image);
        req.body.image = req.file.path;
    }
    if (req.body.role === "superadmin")
        req.body.role = undefined;
    const updatedUser = yield user.update(req.body);
    yield updatedUser.save();
    res.status(200).json({
        status: 200,
        data: updatedUser,
    });
}));
exports.updateUsersLoginAndPassword = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield controller_1.User.findOne({ where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
    if (!user)
        throw new controller_1.BadRequestError("User not found.");
    if (req.body.password) {
        if (!req.body.currentPassword)
            throw new controller_1.BadRequestError("Please input current password.");
        const password = user.password;
        const currentPassword = req.body.currentPassword;
        const matchPassword = yield controller_1.Password.compare(password, currentPassword);
        if (matchPassword) {
            req.body.password = yield controller_1.Password.toHash(req.body.password);
            const updatedUser = yield user.update({ password: req.body.password });
            yield updatedUser.save();
        }
        else {
            throw new controller_1.BadRequestError("Password is incorrect!");
        }
    }
    if (req.body.login) {
        const currentLogin = yield controller_1.User.findOne({
            where: { login: req.body.login },
        });
        if ((currentLogin === null || currentLogin === void 0 ? void 0 : currentLogin.login) && currentLogin.login !== req.body.login) {
            throw new controller_1.BadRequestError("Login already existing.");
        }
        yield user.update({ login: req.body.login });
        yield user.save();
    }
    if (req.file) {
        if (user.image)
            (0, controller_1.deleteFile)(user.image);
        req.body.image = req.file.path;
    }
    yield user.update(req.body);
    yield user.save();
    res.status(200).json({
        status: 200,
        data: user,
    });
}));
// Delete User
exports.deleteUser = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield controller_1.User.findOne({ where: { id: req.params.id } });
    if ((user === null || user === void 0 ? void 0 : user.role) === "superadmin")
        throw new controller_1.BadRequestError("You can't delete superadmin");
    if (!user)
        throw new controller_1.BadRequestError("Something went wrong.");
    if (user.image)
        (0, controller_1.deleteFile)(user.image);
    const statistic = yield controller_1.Statistic.findOne();
    statistic === null || statistic === void 0 ? void 0 : statistic.update({ users: statistic.users - 1 });
    yield user.destroy();
    res.status(200).json({
        status: 200,
        data: {},
    });
}));

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
exports.currentUser = exports.signout = exports.signin = exports.signup = void 0;
const controller_1 = require("./controller");
// SignUp User
exports.signup = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield controller_1.User.findOne({ where: { login: req.body.login } });
    if (currentUser) {
        throw new controller_1.BadRequestError("Bu foydalanuvchi allaqachon mavjud!");
    }
    const login = req.body.login;
    const password = req.body.password;
    const role = "user";
    const user = yield controller_1.User.create({ login, password, role });
    yield user.save();
    return sendTokenResponse(user, 201, res);
}));
// SignIn User
exports.signin = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUser = yield controller_1.User.findOne();
    if (!currentUser) {
        const login = controller_1.config.ADMIN_LOGIN;
        const password = controller_1.config.ADMIN_PASSWORD;
        const role = "superadmin";
        const user = yield controller_1.User.create({ login, password, role });
        yield user.save();
        if (user.login !== req.body.login) {
            throw new controller_1.BadRequestError("Email yoki parolni xato kiritdingiz!");
        }
        const matchPassword = yield controller_1.Password.compare(user.password, req.body.password);
        if (!matchPassword) {
            throw new controller_1.BadRequestError("Email yoki parolni xato kiritdingiz!");
        }
        return sendTokenResponse(user, 201, res);
    }
    const user = yield controller_1.User.findOne({ where: { login: req.body.login } });
    if (!user) {
        throw new controller_1.BadRequestError("Email yoki parolni xato  kiritdingiz!");
    }
    const matchPassword = yield controller_1.Password.compare(user.password, req.body.password);
    if (!matchPassword) {
        throw new controller_1.BadRequestError("Email yoki parol xato  kiritdingiz!");
    }
    sendTokenResponse(user, 200, res);
}));
// SignOut user
exports.signout = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.end();
}));
// Get Current User
exports.currentUser = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield controller_1.User.findOne({
        where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id },
        attributes: { exclude: ["password"] },
    });
    res.status(200).json({
        status: 200,
        data: user,
    });
}));
const sendTokenResponse = (user, statusCode, res) => {
    const token = controller_1.jwt.sign({
        id: user.id,
        role: user.role,
    }, controller_1.config.JWT_SECRET, {
        expiresIn: controller_1.config.JWT_EXPIRE,
    });
    const options = {
        expires: new Date(Date.now() + Number(controller_1.config.JWT_COOKIE_EXPIRE) * 24 * 60 * 1000),
        httpOnly: true,
        secure: false,
    };
    if (controller_1.config.NODE_ENV === "production") {
        options.secure = true;
    }
    res
        .status(statusCode)
        .cookie("token", token, options)
        .json({ status: statusCode, token });
};

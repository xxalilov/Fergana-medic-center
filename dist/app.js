"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const path = __importStar(require("path"));
const path_1 = require("path");
const express_1 = __importStar(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const compression_1 = __importDefault(require("compression"));
const error_handler_1 = require("./middlewares/error-handler");
const async_1 = require("./middlewares/async");
const not_found_error_1 = require("./errors/not-found-error");
// Routes
const auth_1 = require("./routes/auth");
const user_1 = require("./routes/user");
const category_1 = require("./routes/category");
const sore_1 = require("./routes/sore");
const reservation_1 = require("./routes/reservation");
const room_1 = require("./routes/room");
const app = (0, express_1.default)();
// Set security helmet
app.use((0, helmet_1.default)());
// Prevent http param pollution
app.use((0, hpp_1.default)());
app.use((0, cors_1.default)());
app.use((0, express_1.json)());
app.use((0, cookie_parser_1.default)());
app.use((0, compression_1.default)());
// Files folder
app.use("/static/uploads", express_1.default.static(path.join(__dirname, "../", "static", "uploads")));
app.use((0, express_1.static)((0, path_1.join)(__dirname, "../client/build")));
app.use("/api/v1/auth", auth_1.authRoutes);
app.use("/api/v1/user", user_1.userRoutes);
app.use("/api/v1/category", category_1.categoryRoutes);
app.use("/api/v1/sore", sore_1.soreRoutes);
app.use("/api/v1/reservation", reservation_1.reservationRoutes);
app.use("/api/v1/room", room_1.roomRoutes);
app.get("*", (req, res, next) => {
    res.sendFile((0, path_1.join)(__dirname, "../client/build/index.html"), (err) => {
        next();
    });
});
app.all("*", (0, async_1.asyncHandler)(() => __awaiter(void 0, void 0, void 0, function* () {
    throw new not_found_error_1.NotFoundError("Route Not Found.");
})));
app.use(error_handler_1.errorHandler);
exports.default = app;

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
const app_1 = __importDefault(require("./app"));
const pg_1 = __importDefault(require("./utils/pg"));
const config_1 = __importDefault(require("./config/config"));
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect Database
        yield (0, pg_1.default)();
        const PORT = config_1.default.PORT || 3000;
        const server = app_1.default.listen(PORT, () => {
            console.log(`Listening on PORT ${PORT}`);
        });
        process.on("unhandledRejection", (err) => {
            console.log(`Error: ${err}`);
            // Close server & exit process
            server.close(() => process.exit(1));
        });
    });
})();

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
exports.deleteCategory = exports.getCategories = exports.createCategory = void 0;
const controller_1 = require("./controller");
exports.createCategory = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield controller_1.Category.create(req.body);
    yield category.save();
    res.status(201).json({
        status: 201,
        data: category,
    });
}));
exports.getCategories = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield controller_1.Category.findAll();
    res.status(200).json({
        status: 200,
        data: categories,
    });
}));
exports.deleteCategory = (0, controller_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield controller_1.Category.findOne({ where: { id: req.params.id } });
    if (!category)
        throw new controller_1.BadRequestError("Category Not Found.");
    yield category.destroy();
    res.status(200).json({
        status: 200,
        data: {},
    });
}));

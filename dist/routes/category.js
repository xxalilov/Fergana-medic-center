"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const category_1 = require("../controllers/category");
const router = (0, express_1.Router)();
exports.categoryRoutes = router;
router.route("/").post(auth_1.superadmin, category_1.createCategory).get(category_1.getCategories);
router.delete("/:id", auth_1.superadmin, category_1.deleteCategory);

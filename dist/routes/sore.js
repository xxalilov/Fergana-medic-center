"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.soreRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const sore_1 = require("../controllers/sore");
const router = (0, express_1.Router)();
exports.soreRoutes = router;
router.route("/").get(auth_1.superadmin, sore_1.getSores).post(auth_1.adminProtect, sore_1.createSore);
router.get("/cachier", auth_1.adminProtect, sore_1.getSoresForCachier);
router.get("/doctor", auth_1.doctorProtect, sore_1.getSoresForDoctors);
router
    .route("/:id")
    .get(auth_1.adminProtect, sore_1.getSore)
    .put(auth_1.adminProtect, sore_1.updateSore)
    .delete(auth_1.superadmin, sore_1.deleteSore);
router.post("/doctor/:id", auth_1.adminProtect, sore_1.createSoreToDoctor);
router.post("/room/:id", auth_1.adminProtect, sore_1.createSoreToRoom);

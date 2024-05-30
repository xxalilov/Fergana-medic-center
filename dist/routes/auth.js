"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const auth_2 = require("../middlewares/auth");
const auth_validator_1 = require("../validators/auth.validator");
const validate_request_1 = require("../middlewares/validate-request");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.post("/signin", auth_validator_1.signInValidator, validate_request_1.validateRequest, auth_1.signin);
router.post("/signup", auth_validator_1.signInValidator, validate_request_1.validateRequest, auth_1.signup);
router.post("/signout", auth_1.signout);
router.get("/user", auth_2.protect, auth_1.currentUser);
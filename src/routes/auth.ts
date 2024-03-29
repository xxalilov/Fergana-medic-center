import { Router } from "express";
import { currentUser, signin, signout } from "../controllers/auth";
import { protect } from "../middlewares/auth";
import { signInValidator } from "../validators/auth.validator";
import { validateRequest } from "../middlewares/validate-request";

const router = Router();

router.post("/signin", signInValidator, validateRequest, signin);
router.post("/signout", signout);
router.get("/user", protect, currentUser);

export { router as authRoutes };

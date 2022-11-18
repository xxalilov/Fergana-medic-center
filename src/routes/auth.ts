import {Router} from "express";
import {currentUser, signin, signout, updateUserDetails} from "../controllers/auth";
import {protect} from "../middlewares/auth";

const router = Router();

router.post("/signin", signin);
router.post("/signout", signout);
router.get("/user", protect, currentUser);
router.put("/update", protect, updateUserDetails)

export {router as authRoutes};
import {Router} from "express";
import {createUser, deleteUser, getAllUsers, updateUserDetails, updateUsersLoginAndPassword} from "../controllers/user";
import {upload} from "../utils/file";
import {superadmin, protect} from "../middlewares/auth";

const router = Router();

router.post("/", superadmin, upload.single('image'), createUser);
router.get("/", superadmin, getAllUsers);
router.put("/", protect, upload.single('image'), updateUsersLoginAndPassword);
router.put("/:id", superadmin, upload.single('image'), updateUserDetails);
router.delete("/:id", superadmin, deleteUser);

export {router as userRoutes}
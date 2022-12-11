import { Router } from "express";

import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
  updateRoomForAdmin,
} from "../controllers/room";
import { adminProtect, superadmin } from "../middlewares/auth";

const router = Router();

router.route("/").post(superadmin, createRoom).get(adminProtect, getRooms);

router.route("/admin/:id").put(adminProtect,updateRoomForAdmin);
router.route("/:id").delete(superadmin, deleteRoom).put(superadmin, updateRoom);

export { router as roomRoutes };

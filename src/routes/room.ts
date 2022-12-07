import { Router } from "express";

import {
  createRoom,
  deleteRoom,
  getRooms,
  updateRoom,
} from "../controllers/room";

const router = Router();

router.route("/").post(createRoom).get(getRooms);

router.route("/:id").delete(deleteRoom).put(updateRoom);

export { router as roomRoutes };

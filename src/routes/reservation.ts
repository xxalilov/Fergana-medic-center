import { Router } from "express";
import {
  getReservationForDoctor,
  getReservations,
  getStatistics,
  updateReservation,
  updateReservationForDoctor,
  updateRoomReservation,
} from "../controllers/reservation";
import { adminProtect, doctorProtect, superadmin } from "../middlewares/auth";
const router = Router();

router.get("/doctor", doctorProtect, getReservationForDoctor);

router.get("/statistics", superadmin, getStatistics);

router.get("/:id", superadmin, getReservations);

router.put("/doctor/:id", doctorProtect, updateReservationForDoctor);

router.route("/room/:id").put(adminProtect, updateRoomReservation);
router.route("/:id").put(adminProtect, updateReservation);

export { router as reservationRoutes };

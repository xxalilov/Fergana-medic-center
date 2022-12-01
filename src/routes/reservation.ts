import { Router } from "express";
import { getReservationForDoctor, getReservations, getStatistics, updateReservation, updateReservationForDoctor } from "../controllers/reservation";
import { doctorProtect, superadmin } from "../middlewares/auth";
const router = Router();

router.get('/', getReservations);

router.get("/doctor",doctorProtect, getReservationForDoctor);

router.get("/statistics",superadmin, getStatistics);

router.put('/doctor/:id',doctorProtect, updateReservationForDoctor)

router.route('/:id').put(updateReservation);


export { router as reservationRoutes }
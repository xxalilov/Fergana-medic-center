import { Router } from "express";
import { adminProtect, doctorProtect, superadmin } from "../middlewares/auth";
import {
  createSore,
  createSoreToDoctor,
  createSoreToRoom,
  deleteSore,
  getSore,
  getSores,
  getSoresForCachier,
  getSoresForDoctors,
  updateSore,
} from "../controllers/sore";

const router = Router();

router.route("/").get(superadmin, getSores).post(adminProtect, createSore);
router.get("/cachier", adminProtect, getSoresForCachier);
router.get("/doctor", doctorProtect, getSoresForDoctors);
router
  .route("/:id")
  .get(adminProtect, getSore)
  .put(adminProtect, updateSore)
  .delete(superadmin, deleteSore);
router.post("/doctor/:id", adminProtect, createSoreToDoctor);
router.post("/room/:id", adminProtect, createSoreToRoom);

export { router as soreRoutes };

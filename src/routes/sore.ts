import { Router } from "express";
import { adminProtect, doctorProtect, superadmin } from "../middlewares/auth";
import {
  createSore,
  deleteSore,
  getSore,
  getSores,
  getSoresForCachier,
  getSoresForDoctors,
  updateSore,
} from "../controllers/sore";

const router = Router();

router.route("/").get(superadmin, getSores);
router.get("/cachier", adminProtect, getSoresForCachier);
router.get("/doctor", doctorProtect, getSoresForDoctors);
router
  .route("/:id")
  .post(adminProtect, createSore)
  .get(adminProtect, getSore)
  .put(adminProtect, updateSore)
  .delete(superadmin, deleteSore);

export { router as soreRoutes };

import {Router} from "express";
import {adminProtect, superadmin} from "../middlewares/auth";
import {createSore, deleteSore, getSore, getSores, updateSore} from "../controllers/sore";

const router = Router();

router.route("/").get(adminProtect, getSores);
router.route("/:id").post(adminProtect, createSore).get(adminProtect, getSore).put(adminProtect, updateSore).delete(superadmin, deleteSore);

export {router as soreRoutes}
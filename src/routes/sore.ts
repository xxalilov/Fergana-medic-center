import {Router} from "express";
import {adminProtect} from "../middlewares/auth";
import {createSore, deleteSore, getSore, getSores, updateSore} from "../controllers/sore";

const router = Router();

router.route("/").post(adminProtect, createSore).get(getSores);
router.route("/:id").get(getSore).put(updateSore).delete(deleteSore);

export {router as soreRoutes}
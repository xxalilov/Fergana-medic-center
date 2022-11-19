import {Router} from "express";
import {superadmin} from "../middlewares/auth";
import {createCategory, deleteCategory, getCategories} from "../controllers/category";

const router = Router();

router.route("/").post(superadmin, createCategory).get(getCategories);

router.delete("/:id", superadmin, deleteCategory);

export {router as categoryRoutes}
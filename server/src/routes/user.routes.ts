import { Router } from "express";

import UserController from "../controllers/user.controller";
import userValidator from "../middlewares/user.validator";

const router = Router();

router.post("/", userValidator, UserController.createUser);
router.post("/:id", UserController.editUser);

export default router;

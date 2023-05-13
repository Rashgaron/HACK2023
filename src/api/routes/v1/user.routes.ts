import express, { Request, Response } from "express";
import UserController from "../../controllers/user.controller";

const { createUser, getUsers, getUserById, selectColor } = UserController;
const router = express.Router();

router.route("/").post(createUser).get(getUsers);

router.route("/:id").get(getUserById);

router.route("/:userId/color").post(selectColor);

export default router;

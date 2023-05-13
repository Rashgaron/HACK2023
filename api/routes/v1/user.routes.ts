import express, { Request, Response } from "express";
import UserController from "../../controllers/user.controller";

const { createUser, getUsers, getUserById } = UserController;
const router = express.Router();

router.route("/").post(createUser).get(getUsers);

router.route("/:id").get(getUserById);

export default router;

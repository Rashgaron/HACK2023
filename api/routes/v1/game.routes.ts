import express, { Request, Response } from "express";
import GameController from "../../controllers/game.controller";

const { addGamePunctuation } = GameController;
const router = express.Router();

router.route("/:id").post(addGamePunctuation);

export default router;

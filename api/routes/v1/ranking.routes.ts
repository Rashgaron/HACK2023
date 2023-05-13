import express, { Request, Response } from "express";
import RankingController from "../../controllers/ranking.controller";

const { getRanking } = RankingController;

const router = express.Router();

router.route("/").get(getRanking);

export default router;

import { Request, Response } from "express";
import RankingService from "../services/ranking.service";

const { getRankingFromDB } = RankingService;

const rankingController = () => {
  const getRanking = async (req: Request, res: Response) => {
    try {
      const ranking = await getRankingFromDB();
      res.status(200).json(ranking);
    } catch (error) {
      console.log(error);
    }
  };
  return { getRanking };
};

export default rankingController();

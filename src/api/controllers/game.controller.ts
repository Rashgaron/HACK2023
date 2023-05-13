import { Request, Response } from "express";
import gameService from "../services/game.service";
import rankingService from "../services/ranking.service";

const { addGamePunctuationOnDB } = gameService;
const { addPunctuationToRanking } = rankingService;
const gameController = () => {
  const addGamePunctuation = async (req: Request, res: Response) => {
    try {
      const { punctuation, extraCoins } = req.body;
      const { id } = req.params;

      console.log(punctuation, extraCoins, id);
      const user = await addGamePunctuationOnDB(
        id,
        punctuation ? Number(punctuation) : 0,
        extraCoins ? Number(extraCoins) : 0
      );
      if (user) await addPunctuationToRanking(user, punctuation);
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "Punctuation added", user });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addGamePunctuation,
  };
};

export default gameController();

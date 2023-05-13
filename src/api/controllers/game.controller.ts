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

      const user = await addGamePunctuationOnDB(
        id,
        Number(punctuation),
        Number(extraCoins)
      );
      if (user) await addPunctuationToRanking(user, punctuation);

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

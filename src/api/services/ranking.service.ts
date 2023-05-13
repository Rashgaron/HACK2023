import { IUser } from "../models/interfaces/IUser";
import Ranking from "../models/ranking.model";

const rankingService = () => {
  const getRankingFromDB = async () => {
    const ranking = await Ranking.find();
    return ranking;
  };

  const addPunctuationToRanking = async (user: IUser, punctuation: number) => {
    const { id, name } = user;
    let ranking = await Ranking.findOne();
    if (!ranking) ranking = await Ranking.create({});
    if (ranking) {
      if (ranking.rankingOfUsers.length < 10) {
        ranking.rankingOfUsers.push({
          userId: id,
          punctuation,
          userName: name,
        });
      } else {
        let indexToReplace = -1;
        let punctuationToReplace = 10000000000000000;
        ranking.rankingOfUsers.map((userRanking, index) => {
          if (
            punctuation > userRanking.punctuation &&
            punctuationToReplace > userRanking.punctuation
          ) {
            indexToReplace = index;
            punctuationToReplace = userRanking.punctuation;
          }
        });
        if (indexToReplace !== -1)
          ranking.rankingOfUsers[indexToReplace] = {
            userId: id,
            punctuation,
            userName: name,
          };
      }
      ranking.rankingOfUsers.sort((a, b) => b.punctuation - a.punctuation);
      await ranking.save();
      return ranking;
    }
  };
  return {
    getRankingFromDB,
    addPunctuationToRanking,
  };
};

export default rankingService();

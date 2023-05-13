import Users from "../models/user.model";

const gameService = () => {
  const addGamePunctuationOnDB = async (
    id: string,
    punctuation: number,
    extraCoins: number
  ) => {
    try {
      const user = await Users.findById(id);
      if (user) {
        user.coins = user.coins + punctuation ?? 0 + extraCoins ?? 0;
        if (punctuation) {
          user.totalPunctuation += Number(punctuation);
          if (user.maxPunctuations.length < 10) {
            user.maxPunctuations.push(punctuation);
          } else {
            let indexToReplace = -1;
            let punctuationToReplace = 10000000000000000;
            user.maxPunctuations.map((maxPunctuation, index) => {
              if (
                punctuation > maxPunctuation &&
                punctuationToReplace > maxPunctuation
              ) {
                indexToReplace = index;
                punctuationToReplace = maxPunctuation;
              }
            });
            if (indexToReplace !== -1)
              user.maxPunctuations[indexToReplace] = punctuation;
          }

          user.maxPunctuations.sort((a, b) => b - a);
        }

        await user.save();
        return user;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addGamePunctuationOnDB,
  };
};
export default gameService();

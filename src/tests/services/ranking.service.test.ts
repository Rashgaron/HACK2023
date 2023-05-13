import RankingService from "../../api/services/ranking.service";
import Ranking from "../../api/models/ranking.model";
import { IRanking, IUserRanking } from "../../api/models/interfaces/IRanking";
import { IUser } from "../../api/models/interfaces/IUser";

let rankingWithLessThan10Users = {} as IRanking;
let rankingWith10Users = {} as IRanking;

beforeEach(() => {
  jest.clearAllMocks();
  rankingWithLessThan10Users = {
    id: "1",
    rankingOfUsers: [
      { userId: "1", punctuation: 10, userName: "1" },
      { userId: "2", punctuation: 20, userName: "2" },
      { userId: "3", punctuation: 30, userName: "3" },
    ],
  };

  rankingWith10Users = {
    id: "1",
    rankingOfUsers: [
      { userId: "1", punctuation: 10, userName: "1" },
      { userId: "2", punctuation: 20, userName: "2" },
      { userId: "3", punctuation: 30, userName: "3" },
      { userId: "4", punctuation: 40, userName: "4" },
      { userId: "5", punctuation: 50, userName: "5" },
      { userId: "6", punctuation: 60, userName: "6" },
      { userId: "7", punctuation: 70, userName: "7" },
      { userId: "8", punctuation: 80, userName: "8" },
      { userId: "9", punctuation: 90, userName: "9" },
      { userId: "10", punctuation: 100, userName: "10" },
    ],
  };
});

describe("Given a ranking service", () => {
  describe("When it's called the addPunctuationToRanking", () => {
    it("Should add a punctuation to the ranking if the ranking has less than 10 users", async () => {
      const { addPunctuationToRanking } = RankingService;
      Ranking.findOne = jest
        .fn()
        .mockReturnValue({ ...rankingWithLessThan10Users, save: jest.fn() });
      const ranking = await addPunctuationToRanking(
        { id: "1", name: "pedro" } as IUser,
        40
      );
      expect(ranking!.rankingOfUsers.length).toBe(4);
    });
    it("Should add a punctuation to the ranking if the ranking has 10 users and the punctuation is higher than the lowest punctuation", async () => {
      const { addPunctuationToRanking } = RankingService;
      Ranking.findOne = jest
        .fn()
        .mockReturnValue({ ...rankingWith10Users, save: jest.fn() });
      const ranking = await addPunctuationToRanking(
        { id: "1", name: "dani" } as IUser,
        10000
      );
      expect(ranking!.rankingOfUsers.length).toBe(10);
      expect(
        ranking!.rankingOfUsers.find(
          (ranking: IUserRanking) => ranking.punctuation === 10
        )
      ).toBeUndefined();
    });

    it("Should do nothing if the new punctuation is lower than the lowest punctuation of the ranking", async () => {
      const { addPunctuationToRanking } = RankingService;
      Ranking.findOne = jest
        .fn()
        .mockReturnValue({ ...rankingWith10Users, save: jest.fn() });
      Ranking.create = jest.fn().mockReturnValue(rankingWith10Users);
      const ranking = await addPunctuationToRanking(
        { id: "1", name: "dani" } as IUser,
        1
      );
      expect(ranking!.rankingOfUsers.length).toBe(10);
      expect(
        ranking!.rankingOfUsers.find(
          (ranking: IUserRanking) => ranking.punctuation === 10
        )
      ).toBeDefined();
      expect(ranking!.rankingOfUsers).toEqual(
        rankingWith10Users.rankingOfUsers
      );
    });

    it("Should call create Ranking if there is no ranking on the DB", async () => {
      const { addPunctuationToRanking } = RankingService;
      Ranking.findOne = jest.fn().mockReturnValue(null);
      Ranking.create = jest
        .fn()
        .mockReturnValue({ ...rankingWith10Users, save: jest.fn() });
      const ranking = await addPunctuationToRanking(
        { id: "1", name: "dani" } as IUser,
        10000
      );
      expect(Ranking.create).toHaveBeenCalled();
    });
  });

  describe("When it's called the getRankingFromDB", () => {
    it("Should call the find method of Rankung", async () => {
      Ranking.find = jest.fn();
      await RankingService.getRankingFromDB();
      expect(Ranking.find).toHaveBeenCalled();
    });
  });
});

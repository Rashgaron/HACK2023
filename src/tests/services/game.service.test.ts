import GameService from "../../api/services/game.service";
import Users from "../../api/models/user.model";

describe("Given a game service", () => {
  describe("when it's called the addGamePunctuationOnDB", () => {
    it("Should add a punctuation to the user if the punctuation is provided", async () => {
      const { addGamePunctuationOnDB } = GameService;
      Users.findById = jest
        .fn()
        .mockReturnValue({ coins: 0, save: jest.fn(), maxPunctuations: [] });
      const user = await addGamePunctuationOnDB("1", 10, 0);
      expect(user!.coins).toBe(10);
    });
    it("Should add coins to the user if the extraCoins is provided", async () => {
      const { addGamePunctuationOnDB } = GameService;
      Users.findById = jest
        .fn()
        .mockReturnValue({ coins: 0, save: jest.fn(), maxPunctuations: [] });
      const user = await addGamePunctuationOnDB("1", 0, 10);
      expect(user!.coins).toBe(10);
    });
    it("Should add a punctuation to the user if the punctuation is provided and the user has less than 10 maxPunctuations", async () => {
      const { addGamePunctuationOnDB } = GameService;
      Users.findById = jest
        .fn()
        .mockReturnValue({ coins: 0, save: jest.fn(), maxPunctuations: [] });
      const user = await addGamePunctuationOnDB("1", 10, 0);
      expect(user!.maxPunctuations.length).toBe(1);
    });
    it("Should has called the save method of the user", async () => {
      const { addGamePunctuationOnDB } = GameService;
      const user = { coins: 0, save: jest.fn(), maxPunctuations: [] };
      Users.findById = jest.fn().mockReturnValue(user);
      await addGamePunctuationOnDB("1", 10, 0);
      expect(user.save).toHaveBeenCalled();
    });
  });
});

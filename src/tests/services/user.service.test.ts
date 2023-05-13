import userService from "../../api/services/user.service";
import Users from "../../api/models/user.model";

beforeEach(() => {
  jest.clearAllMocks();
});
describe("Given an user service", () => {
  describe("When it's called the cerateUserOnDB", () => {
    it("Should call the create method of the User model ", async () => {
      Users.create = jest.fn();
      await userService.createUserOnDB("pedro");
      expect(Users.create).toHaveBeenCalled();
      expect(Users.create).toHaveBeenCalledWith({ name: "pedro" });
    });
  });
});

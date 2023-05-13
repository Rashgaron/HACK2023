import { IUser } from "../models/interfaces/IUser";
import Users from "../models/user.model";
import Articles from "../models/articles.model";

const userService = () => {
  const selectColorOnDB = async (userId: string, colorId: string) => {
    const user = await Users.findById(userId);
    const color = await Articles.findById(colorId);
    if (user && color) {
      user.color = color.title;
      await user.save();
      return user;
    }
    return null;
  };

  const createUserOnDB = async (name: string): Promise<IUser> => {
    const createdUser = await Users.create({ name });
    return createdUser;
  };

  const getUsersFromDB = async (): Promise<IUser[]> => {
    const users = await Users.find();
    return users;
  };

  const getUserByIdFromDB = async (id: string): Promise<IUser | null> => {
    const user = await Users.findById(id);
    return user;
  };

  return {
    createUserOnDB,
    getUsersFromDB,
    getUserByIdFromDB,
    selectColorOnDB
  };
};

export default userService();

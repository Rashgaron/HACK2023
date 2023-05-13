import { IUser } from "../models/interfaces/IUser";
import Users from "../models/user.model";

const userService = () => {
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
  };
};

export default userService();

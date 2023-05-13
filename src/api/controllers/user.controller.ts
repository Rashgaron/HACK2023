import { Request, Response } from "express";
import userService from "../services/user.service";

const { createUserOnDB, getUsersFromDB, getUserByIdFromDB } = userService;

const userController = () => {
  const createUser = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const createdUser = await createUserOnDB(name);
      res.status(201).json(createdUser);
    } catch (error: any) {
      console.log(error.code);
      if (error && error.code === 11000) {
        return res.status(400).json({ message: "User already exists" });
      }
    }
  };

  const getUsers = async (req: Request, res: Response) => {
    try {
      const users = await getUsersFromDB();
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await getUserByIdFromDB(id);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    createUser,
    getUsers,
    getUserById,
  };
};

export default userController();

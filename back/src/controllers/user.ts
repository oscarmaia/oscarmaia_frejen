import bcrypt from "bcrypt";
import { Response, Request, NextFunction } from "express";
import userService from "../services/user";

export async function findUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.findUsers();
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
}
export async function findUserById(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    console.log(userId);
    if (userId) {
      const user = await userService.findById(parseInt(userId));
      if (user) {
        res.status(200).send(user);
      } else {
        res.sendStatus(404);
      }
    }
  } catch (error) {
    next(error);
  }
}
export async function updateUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;
    const data = req.body;

    if (userId) {
      const user = await userService.updateUser(parseInt(userId), data);
      res.status(200).send(user);
    }
  } catch (error) {
    next(error);
  }
}

import { Router } from "express";
import { findUserById, findUsers, updateUser } from "../controllers/user";

const usersRouter = Router();

usersRouter.get("/", findUsers);
usersRouter.get("/:userId", findUserById);
usersRouter.put("/:userId", updateUser);

export { usersRouter };

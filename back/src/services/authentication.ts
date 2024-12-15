import { ApplicationError } from "./errors";
import { User } from "../models";
import bcrypt from "bcrypt";
import userRepository from "../repositories/users";
import { StatusCodes } from "http-status-codes";

export type LoginParams = Pick<User, "email" | "password">;

export interface UserDTO {
  email: string;
  name: string;
  token: string;
  id: number;
  admin: boolean;
  id_department: number;
}

async function login(params: LoginParams): Promise<User> {
  const { email, password } = params;
  const user = await getUser(email);

  if (!user) {
    throw new ApplicationError(StatusCodes.NOT_FOUND, "User is not registered.");
  }

  const result = await validatePassword(password, user.password);

  if (!result) {
    throw new ApplicationError(StatusCodes.UNAUTHORIZED, "Invalid password.");
  }

  return user;
}

async function getUser(email: string): Promise<User | null> {
  return await userRepository.findByEmail(email);
}

async function validatePassword(password: string, userPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, userPassword);
}

const authenticationService = {
  login,
  getUser,
};

export default authenticationService;

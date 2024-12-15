import { updateUserSchema } from "./../schemas/user";
import bcrypt from "bcrypt";
import { CreationAttributes } from "sequelize";
import userRepository from "../repositories/users";
import { User } from "../models";
import { ApplicationError } from "./errors";
import { StatusCodes } from "http-status-codes";

export async function createUser({
  email,
  password,
  name,
  id_department,
  admin,
}: CreationAttributes<User>): Promise<User> {
  password = password.toString();
  const isEmailRegistered = await isEmailAlreadyRegistered(email);
  if (isEmailRegistered) throw new ApplicationError(StatusCodes.CONFLICT, "email already registered.");
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.createUser({
    email,
    password: hashedPassword,
    name,
    id_department,
    admin,
  });
}

async function isEmailAlreadyRegistered(email: string): Promise<boolean> {
  const userWithSameEmail = await userRepository.findByEmail(email);
  return userWithSameEmail ? true : false;
}

async function findUsers() {
  return await userRepository.findUsers();
}
async function findById(id: number) {
  return await userRepository.findById(id);
}

async function updateUser(id: number, data: Partial<CreationAttributes<User>>) {
  const { error } = updateUserSchema.validate(data);
  if (error) {
    const errorMessage = error.details && error.details[0] ? error.details[0].message : "Invalid data";
    throw new ApplicationError(StatusCodes.BAD_REQUEST, errorMessage);
  }

  if (data.password) {
    const hashedPassword = await bcrypt.hash(data.password, 12);
    data.password = hashedPassword;
  }
  const [updated] = await User.update(data, {
    where: { id },
  });
  if (updated) {
    const updatedUser = await findById(id);
    return updatedUser;
  }
  throw new ApplicationError(StatusCodes.NOT_FOUND, "User not found");
}
const userService = {
  findUsers,
  findById,
  createUser,
  updateUser,
};

export default userService;

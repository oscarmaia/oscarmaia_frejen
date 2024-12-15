import { CreationAttributes } from "sequelize";
import { User } from "../models";
import { ApplicationError } from "../services/errors";
import { StatusCodes } from "http-status-codes";

async function createUser(data: CreationAttributes<User>) {
  return await User.create(data);
}
async function updateUser(id: number, data: Partial<CreationAttributes<User>>) {
  const [updated] = await User.update(data, {
    where: { id },
  });
  if (updated) {
    const updatedUser = await findById(id);
    return updatedUser;
  }
  throw new ApplicationError(StatusCodes.NOT_FOUND, "User not found");
}

async function findUsers() {
  return await User.findAll();
}
async function findById(id: number) {
  return await User.findByPk(id);
}
async function findByEmail(email: string): Promise<User | null> {
  return await User.findOne({ where: { email } });
}
const userRepository = {
  findUsers,
  findById,
  findByEmail,
  createUser,
  updateUser
};

export default userRepository;

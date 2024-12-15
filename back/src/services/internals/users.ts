import userRepository from "../../repositories/users";

async function isEmailAlreadyRegistered(email: string): Promise<boolean> {
  const userWithSameEmail = await userRepository.findByEmail(email);
  return userWithSameEmail ? true : false;
}

const userInternal = {
  isEmailAlreadyRegistered,
};

export default userInternal;

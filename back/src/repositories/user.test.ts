import { Sequelize } from "sequelize";

import { startServer } from "../app";
import userRepository from "./users";
import userService from "../services/user";
import { User } from "../models";
import userInternal from "../services/internals/users";

const db = new Sequelize("sqlite::memory");

beforeAll(async () => await startServer(db));

describe("create user", () => {
  it("should create a user in database", async () => {
    const result = await userService.createUser({
      email: "email@email.com",
      name: "User",
      password: "password",
    });
    expect(result).toBeDefined();
  });

  it("it should find user by email", async () => {
    const userEmail = "email@email.com";
    const user = await userRepository.findByEmail(userEmail);
    console.log(user);
    expect(user?.email).toBe(userEmail);
  });

  it("it should return true if the email exists in database", async () => {
    const ret = await userInternal.isEmailAlreadyRegistered("email@email.com");
    expect(ret).toBe(true);
    const ret2 = await userInternal.isEmailAlreadyRegistered("unexistent@email.com");
    expect(ret2).toBe(false);
  });
});

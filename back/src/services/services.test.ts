import { Sequelize } from "sequelize";
import { startServer } from "../app";
import userService from "./user";
import { ApplicationError } from "./errors";
import authenticationService from "./authentication";
import { Department } from "../models";

const db = new Sequelize("sqlite::memory:");
describe("User Service", () => {
  beforeAll(async () => {
    await startServer(db);
    await Department.create({ title: "Development" });
  });
  const payload = {
    email: "email@email.com",
    name: "User",
    password: "password",
    id_department: 1,
  };

  it("should create a user and register in database", async () => {
    const createdUser = await userService.createUser(payload);
    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe("User");
    expect(createdUser.password).not.toBe("password");
  });

  it("shouldn't create a user when a user with same e-mail already exists", async () => {
    await expect(userService.createUser(payload)).rejects.toHaveProperty("message", "email already registered.");
  });
  it("should thrown a ApplicationError when a user with same e-mail already exists", async () => {
    await expect(userService.createUser(payload)).rejects.toBeInstanceOf(ApplicationError);
  });
  it("should update a user", async () => {
    const user = await userService.findById(1);
    const updatedUser = await userService.updateUser(user!.id, { name: "Updated User", password: "newPassword" });
    expect(updatedUser).toBeDefined();
    expect(updatedUser?.name).toBe("Updated User");
    expect(updatedUser?.password).not.toBe("newPassword");
    expect(updatedUser?.password).not.toBe(user?.password);
  });
});

describe("Authentication Service", () => {
  beforeAll(async () => {
    await startServer(db);
    await Department.create({ title: "Development" });
  });
  const payload = {
    email: "email@email.com",
    name: "User",
    password: "password",
    id_department: 1,
  };
  it("should create a user", async () => {
    expect(await userService.createUser(payload)).toBeDefined();
  });
  it("should return a user when email and password match", async () => {
    const user = await authenticationService.login({ email: payload.email, password: payload.password });
    expect(user).toBeDefined();
    expect(user.email).toBe("email@email.com");
  });
  it("shouldn't return a user when email and password isn't match", async () => {
    await expect(
      authenticationService.login({ email: payload.email, password: "wrongpassword" })
    ).rejects.toBeInstanceOf(ApplicationError);
  });
  it("shouldn't return a user when email and password isn't match", async () => {
    await expect(
      authenticationService.login({ email: "wrongemail@email.com", password: payload.password })
    ).rejects.toBeInstanceOf(ApplicationError);
  });
});
afterAll(async () => {
  await db.close();
});

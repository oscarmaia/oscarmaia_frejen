import bcrypt from "bcrypt";
import userRepository from "../repositories/users";
import authenticationService from "./authentication";
import { ApplicationError } from "./errors";

jest.mock("../repositories/users");
jest.mock("bcrypt");

describe("Authentication Service", () => {
  const mockUser = {
    id: 1,
    email: "test@example.com",
    password: "hashedPassword123",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return null when user is not found", async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      expect(
        authenticationService.login({
          email: "nonexistent@example.com",
          password: "password123",
        })
      ).rejects.toBeInstanceOf(ApplicationError);
      expect(userRepository.findByEmail).toHaveBeenCalledWith("nonexistent@example.com");
    });

    it("should return user data when credentials are valid", async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await authenticationService.login({
        email: "test@example.com",
        password: "password123",
      });

      expect(userRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("password123", "hashedPassword123");
      expect(result).toEqual(mockUser);
    });

    it("should return null when password is invalid", async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(
        authenticationService.login({
          email: "test@example.com",
          password: "wrongpassword",
        })
      ).rejects.toBeInstanceOf(ApplicationError);

      expect(userRepository.findByEmail).toHaveBeenCalledWith("test@example.com");
      expect(bcrypt.compare).toHaveBeenCalledWith("wrongpassword", "hashedPassword123");
    });
  });
});

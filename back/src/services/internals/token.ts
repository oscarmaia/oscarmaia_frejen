import jwt from "jsonwebtoken";
import { JWTPayload } from "../../middlewares/token";
import { User } from "../../models";

export function generateAuthToken(
  id: number,
  isAdmin: boolean,
  name: string,
  email: string,
  id_department: number
): string {
  return jwt.sign({ id, isAdmin, name, email, id_department } as JWTPayload, process.env.JWT_SECRET || "password");
}

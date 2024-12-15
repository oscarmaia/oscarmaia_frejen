import { Response, Request, NextFunction } from "express";
import authenticationService, { UserDTO } from "../services/authentication";
import { generateAuthToken } from "../services/internals/token";

export async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const user = await authenticationService.login({ email, password });
    const token = generateAuthToken(user.id, user.admin, user.name, user.email, user.id_department);
    const dto: UserDTO = {
      email,
      name: user.name,
      token,
      id: user.id,
      admin: user.admin,
      id_department: user.id_department,
    };
    res.status(200).send(dto);
  } catch (error) {
    next(error);
  }
}

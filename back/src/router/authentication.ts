import { Request, Response, Router } from "express";
import { login } from "../controllers/authentication";
import { AuthenticatedRequest, authenticateToken } from "../middlewares/token";
import { StatusCodes } from "http-status-codes";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/validate", authenticateToken, (req: any, res: any) => res.send(req.user));

export { authRouter };

import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: JWTPayload;
}

export type JWTPayload = {
  id: number;
  id_department: number;
  isAdmin: boolean;
};

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.sendStatus(401); // Unauthorized
  } else {
    jwt.verify(token, process.env.JWT_SECRET || "password", (err, decoded) => {
      if (err) {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
      }
      req.user = decoded as JWTPayload;
      next();
    });
  }
}

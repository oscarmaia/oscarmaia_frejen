import { ApplicationError } from "../services/errors";
import { NextFunction, Request, Response } from "express";

export function handleApplicationErrors(
  err: Error | ApplicationError,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApplicationError) {
    const error = err as ApplicationError;
    res.status(error.statusCode).send(error.message);
  } else {
    res.status(500).send("Internal Server Error");
  }
}

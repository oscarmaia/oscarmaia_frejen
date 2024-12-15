import { Response, Request } from "express";
import stateService from "../services/state";

export async function findStates(req: Request, res: Response) {
  const states = await stateService.findStates();
  res.status(200).send(states);
}

import { Router } from "express";
import { findStates } from "../controllers/state";

const statesRouter = Router();

statesRouter.get("/", findStates);

export { statesRouter };

import { ApplicationError } from "./errors";
import { State, User } from "../models";
import stateRepository from "../repositories/state";

async function findStates(): Promise<State[]> {
  const states = await stateRepository.findStates();
  if (!states) {
    throw new ApplicationError(404, "States not found.");
  }
  return states;
}

const stateService = {
  findStates,
};

export default stateService;

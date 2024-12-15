import { CreationAttributes } from "sequelize";
import { State, User } from "../models";

async function findStates() {
  return await State.findAll();
}

const stateRepository = {
  findStates,
};

export default stateRepository;

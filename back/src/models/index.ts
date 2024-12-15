import State from "./state";
import Department from "./department";
import User from "./user";
import Ticket from "./ticket";
import { Sequelize } from "sequelize";

export function initializeModels(sequelize: Sequelize) {
  User.initUser(sequelize);
  Ticket.initTicket(sequelize);
  Department.initDepartment(sequelize);
  State.initState(sequelize);

  // Define associations
  User.belongsTo(Department, { foreignKey: "id_department" });
  Ticket.belongsTo(User, { as: "creator", foreignKey: "created_by" });
  Ticket.belongsTo(User, { as: "updater", foreignKey: "updated_by" });
  Ticket.belongsTo(State, { foreignKey: "id_state" });
  Ticket.belongsTo(Department, { foreignKey: "id_department" });
}

export { User, Department, State, Ticket };

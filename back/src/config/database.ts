import { Sequelize } from "sequelize";
import { initializeModels } from "../models";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "data/db.sqlite",
  host: "localhost",
});

export async function initializeDatabase(database: Sequelize) {
  try {
    await database.authenticate();
    initializeModels(database);
    await database.sync({ force: true });
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

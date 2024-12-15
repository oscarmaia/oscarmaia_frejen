import express from "express";
import cors from "cors";
import { initializeDatabase } from "./config/database";
import { usersRouter } from "./router/user";
import { Sequelize } from "sequelize";
import { authRouter } from "./router/authentication";
import { handleApplicationErrors } from "./middlewares/error-handling";
import { ticketsRouter } from "./router/ticket";
import { statesRouter } from "./router/state";
import { departmentRouter } from "./router/department";
import { populateDatabaseWithDummyData } from "./services/internals/populate-database";

export async function startServer(database: Sequelize) {
  await initializeDatabase(database);
  if (process.env.NODE_ENV != "test") {
    await populateDatabaseWithDummyData();
  }
  return Promise.resolve(app);
}

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (req: any, res: any) => {
    res.send(req.body);
  })
  .use("/users", usersRouter)
  .use("/auth", authRouter)
  .use("/tickets", ticketsRouter)
  .use("/states", statesRouter)
  .use("/departments", departmentRouter)
  .use(handleApplicationErrors);

export default app;

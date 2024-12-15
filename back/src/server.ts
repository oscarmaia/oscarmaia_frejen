import app, { startServer } from "./app";
import { sequelize } from "./config/database";
import { loadEnv } from "./config/envs";

loadEnv();

const port = process.env.PORT || 4000;

startServer(sequelize).then(() => {
  app.listen(port, () => {
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
  });
});

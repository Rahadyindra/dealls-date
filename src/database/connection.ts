import { Sequelize } from "sequelize-typescript";
import path from "path";

const sequelize = new Sequelize({
  database: "deallDate",
  dialect: "postgres",
  username: "postgres",
  password: "postgres",
  host: "localhost",
  port: Number(5432),
  models: [path.join(__dirname, "models")],
});

export default sequelize;

import { Sequelize } from "sequelize-typescript";
import path from "path";

const sequelize = new Sequelize({
  database: process.env.DATABASE_NAME,
  dialect: "postgres",
  username: process.env.USER_NAME,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: Number(process.env.DB_PORT),
  models: [path.join(__dirname, "models")],
});

export default sequelize;

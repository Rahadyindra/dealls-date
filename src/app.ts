import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });
import express from "express";
import cors from "cors";
import sequelize from "./database/Connection";
import cookieParser from "cookie-parser";
import router from "./routes/Index";

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(port, () => {
      console.log(`now listening to ${port}`);
    });
  } catch (err) {
    console.error(`Failed to connect to server` + err);
  }
})();

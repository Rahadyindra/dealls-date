import dotenv from "dotenv";
dotenv.config({ path: __dirname + "/../.env" });
import express from "express";
import cors from "cors";
import sequelize from "./database/Connection";
import User from "./database/models/User";

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("lol a boy");
});

(async () => {
  try {
    await sequelize.sync({ alter: true });
    app.listen(port, () => {
      console.log(`now listening to ${port}`);
    });
  } catch (err) {
    console.log(`Failed to connect to server` + err);
  }
})();

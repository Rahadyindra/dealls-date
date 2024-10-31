import express from "express";
import cors from "cors";

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("lol a boy");
});

app.listen(port, () => {
  console.log(`now listening to ${port}`);
});

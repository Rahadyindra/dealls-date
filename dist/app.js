import express from "express";
const port = 8000;
const app = express();
app.get("/", (req, res) => {
    res.send("lol a boy");
});
app.listen(port, () => {
    console.log(`now listening to ${port}`);
});

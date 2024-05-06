import express, { Application, Request, Response } from "express";

const app: Application = express();

require("dotenv").config({ path: "../.env" });

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME;

require("./model/database.model");
app.get("/", (req: Request, res: Response) => {
  res.send("Im alive");
});

app.listen(PORT, () => {
  console.log(`Sever is running on http://${HOSTNAME}:${PORT}`);
});

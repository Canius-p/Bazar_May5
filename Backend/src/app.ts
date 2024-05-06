import express, { Application, Request, Response } from "express";
import { NewDataSource } from "./config/db.config";

const app: Application = express();
require("dotenv").config({ path: "../.env" });

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME;

NewDataSource();
app.get("/", (req: Request, res: Response) => {
  res.send("Im alive");
});

app.listen(PORT, () => {
  console.log(`Sever is running on http://${HOSTNAME}:${PORT}`);
});

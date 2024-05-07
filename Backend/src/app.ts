import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
const app: Application = express();

dotenv.config({ path: '../../.env' });

const PORT = process.env.PORT || 8080;
const HOSTNAME = process.env.HOSTNAME;

import './database/db.connection';
app.get('/', (req: Request, res: Response) => {
  res.send('Im alive');
});

app.listen(PORT, () => {
  console.log(`Sever is running on http://${HOSTNAME}:${PORT}`);
});

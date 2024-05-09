import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
const app: Application = express();

dotenv.config();

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

import './database/db.connection';
import userRoute from './routes/user.route';
import adminSeeder from './admin.seeder';

app.use(express.json());

adminSeeder();
app.get('/', (req: Request, res: Response) => {
  res.send('Im alive');
});

app.use('/api', userRoute);

app.listen(PORT, () => {
  console.log(`Sever is running on http://${HOSTNAME}:${PORT}`);
});

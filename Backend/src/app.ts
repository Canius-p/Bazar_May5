import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
const app: Application = express();

dotenv.config({ path: './.env' });

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

import './database/db.connection';

import adminSeeder from './admin.seeder';
import categoryController from './controller/category.controller';

import userRoute from './routes/user.route';
import productRoute from './routes/product.route';
import categoryRoute from './routes/category.route';
app.use(express.json());

adminSeeder();
app.get('/', (req: Request, res: Response) => {
  res.send('Im alive');
});

app.use('/api', userRoute);
app.use('/api/admin/product', productRoute);
app.use('/api', categoryRoute);
app.listen(PORT, () => {
  categoryController.seedCategory();
  console.log(`Sever is running on http://${HOSTNAME}:${PORT}`);
});

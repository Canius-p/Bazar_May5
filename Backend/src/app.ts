import express, { Application, Request, Response } from 'express';
import * as dotenv from 'dotenv';
const app: Application = express();

dotenv.config({ path: './.env' });

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

import './database/db.connection';

import adminSeeder from './admin.seeder';
import categoryController from './controller/category.controller';
import axios from 'axios';
import userRoute from './routes/user.route';
import productRoute from './routes/product.route';
import categoryRoute from './routes/category.route';
import cartRoute from './routes/cart.route';
import orderRoute from './routes/order.route';
app.use(express.json());

adminSeeder();
app.get('/', (req: Request, res: Response) => {
  res.send('Im alive');
});

app.use('/api', userRoute);
app.use('/api/admin/product', productRoute);
app.use('/api', categoryRoute);
app.use('/api/user', cartRoute);
app.use('/api/user/order', orderRoute);
app.listen(PORT, () => {
  categoryController.seedCategory();
  console.log(`Sever is running on http://${HOSTNAME}:${PORT}`);
});

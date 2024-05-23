import express, { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import { errorHandler } from '../services/catch.async';
import OrderDetails from '../database/models/orderdetails.model';
import orderController from '../controller/order.controller';
const router: Router = express.Router();

router
  .route('/')
  .post(
    authMiddleware.isAuthencated,
    errorHandler(orderController.createOrder)
  );

export default router;

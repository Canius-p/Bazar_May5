import express, { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import cartController from '../controller/cart.controller';
import { errorHandler } from '../services/catch.async';
const router: Router = express.Router();

router
  .route('/cart')
  .post(authMiddleware.isAuthencated, errorHandler(cartController.addToCart))
  .get(authMiddleware.isAuthencated, errorHandler(cartController.getCart));

router
  .route('/cart/:productId')
  .patch(authMiddleware.isAuthencated, errorHandler(cartController.updateCart))
  .delete(authMiddleware.isAuthencated, cartController.deleteCart);
export default router;

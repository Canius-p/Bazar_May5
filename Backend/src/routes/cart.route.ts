import express, { Router } from 'express';
import authMiddleware from '../middleware/auth.middleware';
import cartController from '../controller/cart.controller';
const router: Router = express.Router();

router.route('/').post(authMiddleware.isAuthencated, cartController.addTOCart);

export default router;

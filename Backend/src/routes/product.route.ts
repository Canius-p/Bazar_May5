import express, { Router } from 'express';
import authMiddleware, { Role } from '../middleware/auth.middleware';
import productController from '../controller/product.controller';
import { multer, storage } from '../middleware/multer.middleware';
const router: Router = express.Router();

const upload = multer({ storage: storage });
router
  .route('/')
  .post(
    authMiddleware.isAuthencated,
    authMiddleware.restrictTo(Role.Admin),
    upload.single('image'),
    productController.addProduct
  )
  .get(productController.getAllProduct);

export default router;

import express, { Router } from 'express';

import authMiddleware, { Role } from '../middleware/auth.middleware';
import categoryController from '../controller/category.controller';
const router: Router = express.Router();

router
  .route('/categories')
  .post(
    authMiddleware.isAuthencated,
    authMiddleware.restrictTo(Role.Admin),
    categoryController.addcategory
  )
  .get(categoryController.getCategories);

router
  .route('/category/:id')
  .delete(
    authMiddleware.isAuthencated,
    authMiddleware.restrictTo(Role.Admin),
    categoryController.deleteCategories
  );
router
  .route('/category/:id')
  .patch(
    authMiddleware.isAuthencated,
    authMiddleware.restrictTo(Role.Admin),
    categoryController.updateCategories
  );
export default router;

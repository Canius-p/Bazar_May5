import express, { Router } from 'express';
import AuthController from '../controller/user.controller';
import { errorHandler } from '../services/catch.async';

const router: Router = express.Router();

router.route('/register').post(errorHandler(AuthController.registerUser));
router.route('/login').get(errorHandler(AuthController.loginuser));

export default router;

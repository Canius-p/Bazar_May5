import express, { Router } from 'express';
import AuthController from '../controller/user.controller';

const router: Router = express.Router();

router.route('/register').post(AuthController.registerUser);
router.route('/login').get(AuthController.loginuser);

export default router;
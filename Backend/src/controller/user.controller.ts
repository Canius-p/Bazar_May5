import { Request, Response } from 'express';
import User from '../database/models/user.model';

class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({
        message: 'Please provide Username,email,password',
      });
      return;
    }

    await User.create({
      username,
      email,
      password,
    });
    res.status(200).json({
      message: 'User registed successfully',
    });
    return;
  }
}

export default AuthController;

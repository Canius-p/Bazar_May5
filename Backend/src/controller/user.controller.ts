import { Request, Response } from 'express';
import User from '../database/models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class AuthController {
  public static async registerUser(req: Request, res: Response): Promise<void> {
    const { username, email, password } = req.body;
    if (!username || !password || !email) {
      res.status(400).json({
        message: 'Please provide Username,email,password',
      });
      return;
    }
    const userfound = await User.findAll({
      where: { email: email },
    });
    if (userfound.length > 0) {
      res.status(400).json({
        message: 'User already exists with same Email',
      });
      return;
    }
    await User.create({
      username,
      email,
      password: bcrypt.hashSync(password, 8),
    });
    res.status(200).json({
      message: 'User registed successfully',
    });
    return;
  }

  public static async loginuser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: 'Please provide Email and Password',
      });
      return;
    }
    const [data] = await User.findAll({
      where: {
        email: email,
      },
    });
    if (!data) {
      res.status(404).json({
        message: 'User not found',
      });
      return;
    }

    const isMatched = bcrypt.compareSync(password, data.password);
    if (isMatched) {
      const token = jwt.sign({ id: data.id }, 'newkey', {
        expiresIn: '10d',
      });

      res.status(200).json({
        message: 'Logged in successfully',
        data: token,
      });
    } else {
      res.status(403).json({
        message: 'Invalid email or password',
      });
    }
  }
}

export default AuthController;

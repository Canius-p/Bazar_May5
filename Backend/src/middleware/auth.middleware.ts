import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../database/models/user.model';

interface authRequest extends Request {
  user?: {
    username: string;
    email: string;
    role: string;
    password: string;
    id: string;
  };
}
export enum Role {
  Admin = 'admin',
  Customer = 'customer',
}
class AuthMiddleware {
  async isAuthencated(
    req: authRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    //Get the token from user
    const token = req.headers.authorization;
    if (!token || token === undefined) {
      res.status(403).json({
        message: 'Token not provided',
      });
      return;
    }
    //verify token orginality
    jwt.verify(
      token,
      (process.env.JWTSECERTKEY as string) || 'hehehe',
      async (err, decoded: any) => {
        if (err) {
          res.status(403).json({
            message: 'Invalid token',
          });
        } else {
          //verifying the docoded jwt has id or not
          try {
            const userData = await User.findByPk(decoded.id);
            if (!userData) {
              res.status(404).json({
                message: 'User with that token exists',
              });
              return;
            }
            req.user = userData;
            next();
          } catch (error) {
            res.status(500).json({
              message: 'Something Went wrong',
            });
          }
        }
      }
    );
  }

  restrictTo(...roles: Role[]) {
    return (req: authRequest, res: Response, next: NextFunction) => {
      let userRole = req.user?.role as Role;
      if (!roles.includes(userRole)) {
        res.status(403).json({
          message: 'You dont have Permission',
        });
      } else {
        next();
      }
    };
  }
}

export default new AuthMiddleware();

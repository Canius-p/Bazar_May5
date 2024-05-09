import { Request, Response, NextFunction } from 'express';

export const errorHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => {
      return res.status(500).json({
        message: 'Internal error',
        ErrorMessage: err.message,
      });
    });
  };
};

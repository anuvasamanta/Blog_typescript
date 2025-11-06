import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface UserRequest extends Request {
  user: any;
}

const userAuthCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies && req.cookies.userToken) {
    jwt.verify(req.cookies.userToken, process.env.JWT_SECRET || "hellowelcometowebskittersacademy123456", (err: any, data: any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      (req as UserRequest).user = data;
      next();
    });
  } else {
    return res.status(401).json({ message: 'User token is required' });
  }
};

export default userAuthCheck;
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface AdminRequest extends Request {
  admin?: any;
}

const adminAuthCheck = (req: AdminRequest, res: Response, next: NextFunction) => {
  if (req.cookies && req.cookies.authorToken) {
    jwt.verify(req.cookies.authorToken, process.env.JWT_SECRET_ADMIN || "hellowelcomeAdmin123456", (err: any, data: any) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or expired token' });
      }
      req.admin = data;
      next();
    });
  } else {
    return res.status(401).json({ message: 'Admin token is required' });
  }
};

export default adminAuthCheck;

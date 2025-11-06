import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface TokenRequest extends Request {
  user?: any;
}

const AuthCheck = async (req: TokenRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];

    if (!token) {
      return res.status(400).json({ status: false, message: "Token is required for access this page" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "hellowelcometowebskittersacademy123456" || process.env.JWT_SECRET_ADMIN || "hellowelcomeAdmin123456") as any;
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(400).json({ status: false, message: "Invalid token" });
  }
};

export default AuthCheck;
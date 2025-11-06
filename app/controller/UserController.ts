import { Request, Response } from "express";
import { UserSchemaValidate, UserModel } from "../models/UserModel";
import { userRepositories } from "../repositories/user.repo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  async register(req: Request, res: Response): Promise<any> {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const { error } = UserSchemaValidate.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPass = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ name, email, password: hashedPass });
      const savedUser = await userRepositories.save(newUser);

      return res
        .status(200)
        .json({ message: "user register successfully", data: savedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async login(req: Request, res: Response): Promise<any> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const user = await UserModel.findOne({
        email: email.trim().toLowerCase(),
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      let jwtSecret;
      let cookieName;

      if (user.role === "author") {
        jwtSecret = process.env.JWT_SECRET_ADMIN || "hellowelcomeAdmin123456";
        cookieName = "authorToken";
      } else if (user.role === "user") {
        jwtSecret =
          process.env.JWT_SECRET || "hellowelcometowebskittersacademy123456";
        cookieName = "userToken";
      } else {
        return res.status(401).json({ message: "Invalid user role" });
      }

      const token = jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        jwtSecret,
        { expiresIn: "60m" }
      );
      res.cookie(cookieName, token, { httpOnly: true });
      return res.status(200).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export const studentController = new UserController();

import { CommentModel } from "../models/commentModel";
import { PostModel } from "../models/postModel";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}
class CommentController {
  async checkAuth(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }

  async addComment(req: Request, res: Response) {
    try {
      const { post_id, user_id, comment } = req.body;

      const newComment = await CommentModel.create({
        post_id,
        user_id,
        comment,
      });

    const comments=  await PostModel.findByIdAndUpdate(post_id, {
        $push: { comments: newComment._id },
      });
      

      res.status(200).json({ message: "Comment added successfully",
        comments:comments
       });
    } catch (error) {
      console.error("Error adding comment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export const commentController = new CommentController();

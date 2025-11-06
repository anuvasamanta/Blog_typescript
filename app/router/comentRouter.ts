import express from "express";
import { commentController } from "../controller/CommentController";
import userAuthCheck from "../middleware/userAuthCheck";

const commentRouter = express.Router();
commentRouter.post(
  "/create",
  userAuthCheck,
  commentController.checkAuth,
  commentController.addComment
);

export { commentRouter };

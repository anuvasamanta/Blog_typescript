import express from "express";
import { postController } from "../controller/PostController";
import adminAuthCheck from "../middleware/adminAuthCheck";

const postRouter = express.Router();

postRouter.post("/create", adminAuthCheck, postController.createPost);
postRouter.get("/getPost", postController.getAllPosts);
postRouter.get("/get/singlePost/:id", postController.getPostById);
postRouter.get("/delete", adminAuthCheck, postController.deletePost);
export { postRouter };

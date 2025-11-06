import { Request, Response } from "express";
import { postRepositories } from "../repositories/post.repo";
import { PostModel } from "../models/postModel";

class PostController {
  // create post
  async createPost(req: Request, res: Response) {
    try {
      const { headLines, description, publishDate, author, user_id } = req.body;

      // Basic validation
      if (!headLines || !description || !publishDate || !author || !user_id) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const newPost = await postRepositories.save(req.body);

      res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: newPost,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // get post
async getAllPosts(req: Request, res: Response) {
  try {
    const posts = await PostModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $lookup: {
          from: "comments",
          localField: "comments",
          foreignField: "_id",
          as: "comments",
        },
      },
      {
        $group: {
          _id: "$userDetails.name",
          postCount: { $sum: 1 },
          posts: {
            $push: {
              _id: "$_id",
              headLines: "$headLines",
              description: "$description",
              publishDate: "$publishDate",
              comments: "$comments",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          author: "$_id",
          postCount: 1,
          posts: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Posts retrieved successfully",
      data: posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

  // get single post
  async getPostById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const post = await postRepositories.singleData(id);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Post retrieved successfully",
        data: post,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // update post
  async updatePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const updatedPost = await postRepositories.updatePost(id, req.body);

      if (!updatedPost) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: updatedPost,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // delete post
  async deletePost(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const deletedPost = await postRepositories.deletePost(id);

      if (!deletedPost) {
        return res.status(404).json({
          success: false,
          message: "Post not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Post deleted successfully",
        data: deletedPost,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

export const postController = new PostController();

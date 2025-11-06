import { InterfacePost } from "../interface/post.interface";
import { PostModel } from "../models/postModel";

class PostRepositories {
  // Create a post
  async save(data: InterfacePost) {
    try {
      const newPost = await PostModel.create(data);
      return newPost;
    } catch (error) {
      console.log(error);
      throw error; // Always throw errors to handle them in controllers
    }
  }

  // Get all posts
  async find() {
    try {
      const postList = await PostModel.find().populate('user_id', 'name email'); // Populate user data if needed
      return postList;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Get single post by ID
  async singleData(id: string) {
    try {
      const sdata = await PostModel.findById(id).populate('user_id', 'name email');
      if (!sdata) {
        return null; // Return null instead of string for better error handling
      }
      return sdata;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Update a post
  async updatePost(id: string, data: Partial<InterfacePost>) { // Use Partial for update data
    try {
      const post = await PostModel.findByIdAndUpdate(id, data, { 
        new: true,
        runValidators: true // Run schema validators on update
      });
      if (!post) {
        return null;
      }
      return post;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  // Delete a post
  async deletePost(id: string) {
    try {
      const post = await PostModel.findByIdAndDelete(id);
      if (!post) {
        return null;
      }
      return post; // Return the deleted post
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const postRepositories = new PostRepositories();


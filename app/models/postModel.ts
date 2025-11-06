import mongoose, { Schema, Model } from "mongoose";
import { InterfacePost } from "../interface/post.interface";

const postSchema: Schema = new Schema(
  {
    headLines: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

// Export using ES6 syntax
export const PostModel: Model<InterfacePost> = mongoose.model<InterfacePost>(
  "Post",
  postSchema
);

import mongoose, { Document } from "mongoose";

export interface InterfacePost extends Document {
  headLines: string;
  description: string;
  publishDate: string;
  author: string;
  user_id: mongoose.Types.ObjectId;
  comments: mongoose.Types.ObjectId[];
}

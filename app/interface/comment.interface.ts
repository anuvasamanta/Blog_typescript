import mongoose, { Document } from "mongoose";

export interface IComment extends Document {
  post_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  comment: string;
  createdAt: Date;
}
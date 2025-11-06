import mongoose, { Model, Schema } from "mongoose";
import { IComment} from "../interface/comment.interface";
const commentSchema = new Schema({
  post_id: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const CommentModel: Model<IComment> = mongoose.model<IComment>("Comment", commentSchema);
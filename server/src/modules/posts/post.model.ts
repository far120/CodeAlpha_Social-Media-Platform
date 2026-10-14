import { Schema, model } from "mongoose";
import { Ipost } from "./post.types";

const postSchema = new Schema<Ipost>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      trim: true,
      maxlength: 200,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },

    image: {
      type: String,
      trim: true,
    },

    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      default: [],
    },

    comments: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Comment",
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Post = model<Ipost>("Post", postSchema);
import { Types } from "mongoose";

export interface Ipost {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  title?: string;
  content: string;
  image?: string;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
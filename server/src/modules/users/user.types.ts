import { Types } from "mongoose";

export type UserRole = "user" | "admin" | "super-admin" | "business-manager";

export default interface Iuser {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
  role: UserRole;
  isVerified: boolean;
  isBlocked: boolean;
  avatar?: string;
  bio?: string;
  summary?: string;
  followers?: Types.ObjectId[];
  following?: Types.ObjectId[];
  posts?: Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}

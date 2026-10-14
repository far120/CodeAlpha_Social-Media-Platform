import type { Ipost, IPostUser } from "../../post/type/post.types";

export interface IUserSummaryAnalysis {
  Name?: string;
  Role_Tier?: string;
  Verification_Status?: string;
  Access_Status?: string;
  Profile_Completeness_Details?: string;
  Score?: number;
}

export interface IUserSummary {
  summary?: string;
  analysis?: IUserSummaryAnalysis;
}

export interface Iuser {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  role: "user" | "admin" | "super-admin" | "business-manager";
  isVerified: boolean;
  isBlocked: boolean;
  avatar?: string;
  summary?: IUserSummary;
  followers?: IPostUser[];
  following?: IPostUser[];
  posts?: Ipost[];
  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUserData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  avatar?: string;
}

export interface ICreateUserServicebySuperAdminData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role: "user" | "admin" | "super-admin" | "business-manager";
}

export interface IUpdatePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

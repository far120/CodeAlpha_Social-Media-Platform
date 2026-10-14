export interface IPostUser {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email?: string;
}

export interface ICommentUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

export interface IPopulatedComment {
  _id: string;
  user: ICommentUser;
  post: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ipost {
  _id?: string;
  user: IPostUser | string;
  title?: string;
  content: string;
  image?: string;
  likes: (IPostUser | string)[];
  comments: (IPopulatedComment | string)[];
  createdAt: string;
  updatedAt: string;
}

export interface ICreatePostData {
  title?: string;
  content: string;
  image?: string;
}
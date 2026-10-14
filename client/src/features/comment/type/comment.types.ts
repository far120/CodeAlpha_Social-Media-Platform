export interface IComment {
  _id?: string;
  user: string | ICommentUser;
  post: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICommentUser {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  email?: string;
}

export interface IPopulatedComment {
  _id: string;
  user: ICommentUser;
  post: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

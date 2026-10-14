export interface IloginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface IresponseloginData {
  accessToken: string;
}

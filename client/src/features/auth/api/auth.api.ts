import axiosClient from "../../../lib/axios";
import type {IRegisterData, IloginData, IresponseloginData} from "../types/auth.types";
import type {Iuser} from "../../user/types/user.types";

export const registerUser = async (userData: IRegisterData): Promise<Iuser> => {
  try {
    const response = await axiosClient.post("/users/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData: IloginData): Promise<IresponseloginData> => {
  try {
    const response = await axiosClient.post("/users/login", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
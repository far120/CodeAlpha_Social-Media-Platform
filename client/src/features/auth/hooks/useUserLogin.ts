import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";
import type { IloginData } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Feedback/Toast";

export const useUserLoginMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: loginMutation, isPending: loginPending, isError: loginIsError, error: loginError, isSuccess: loginIsSuccess, } = useMutation({
    mutationFn: (loginData: IloginData) => loginUser(loginData),
    onSuccess: (res: any) => {
      if (res?.token) {
        localStorage.setItem("token", res.token);
      }
      toast.success("Login successful! Welcome back.");
      navigate("/");
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    },
  });

  return { loginMutation, loginPending, loginIsError, loginError, loginIsSuccess };
};

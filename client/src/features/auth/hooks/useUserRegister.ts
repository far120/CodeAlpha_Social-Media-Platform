import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../api/auth.api";
import type { IRegisterData } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/Feedback/Toast";

export const useUserRegisterMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { mutate: registerMutation, isPending: registerPending, isError: registerIsError, error: registerError, isSuccess: registerIsSuccess, } = useMutation({
    mutationFn: (registerData: IRegisterData) => registerUser(registerData),
    onSuccess: () => {
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    },
    onError: (err: any) => {
      const errorMessage =
        err?.response?.data?.message || err?.message || "Registration failed. Please check your inputs.";
      toast.error(errorMessage);
    },
  });

  return { registerMutation , registerPending, registerIsError, registerError, registerIsSuccess, };
};

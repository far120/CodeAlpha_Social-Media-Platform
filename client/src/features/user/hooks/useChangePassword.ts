import { useMutation } from "@tanstack/react-query";
import { changePasswordUser } from "../api/user.api";
import { useToast } from "../../../components/Feedback/Toast";

export const useChangePasswordUserMutation = () => {
  const toast = useToast();

  const {
    mutate: changePasswordMutation,
    isPending: changePasswordPending,
    isError: changePasswordIsError,
    error: changePasswordError,
    isSuccess: changePasswordIsSuccess,
    reset: resetMutation,
  } = useMutation({
    mutationFn: ({
      oldPassword,
      newPassword,
      confirmPassword,
    }: {
      oldPassword: string;
      newPassword: string;
      confirmPassword?: string;
    }) => changePasswordUser(oldPassword, newPassword, confirmPassword),
    onSuccess: () => {
      toast.toast.success("Password changed successfully!");
    },
    onError: (err: any) => {
      toast.toast.error(
        err.response?.data?.message || err.message || "Failed to change password"
      );
    },
  });

  return {
    changePasswordMutation,
    changePasswordPending,
    changePasswordIsError,
    changePasswordError,
    changePasswordIsSuccess,
    resetMutation,
  };
};
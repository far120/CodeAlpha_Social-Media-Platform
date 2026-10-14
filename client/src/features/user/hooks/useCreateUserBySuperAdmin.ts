import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createServicebySuperAdmin } from "../api/user.api";
import type { ICreateUserServicebySuperAdminData } from "../types/user.types";
import { useToast } from "../../../components/Feedback/Toast";

export const useCreateUserBySuperAdminMutation = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const {mutate:createServicebySuperAdminMutation , isPending:createPending , isError:createIsError , error:createError} = useMutation({
        mutationFn: (userServiceData: ICreateUserServicebySuperAdminData) => createServicebySuperAdmin(userServiceData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.toast.success("User created successfully!");
        },
        onError: (error: any) => {
            toast.toast.error(error.response?.data?.message || "Failed to create user");
        },
    });

    return { createServicebySuperAdminMutation , createPending , createIsError , createError };
};


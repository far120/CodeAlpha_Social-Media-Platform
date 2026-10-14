import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateUserProfile } from "../api/user.api"
import type { IUpdateUserData } from "../types/user.types"
import { useToast } from "../../../components/Feedback/Toast";

export const useUpdateUserProfileMutation = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const {mutate:updateMutation , isPending:updatePending , isError:updateIsError , error:updateError} = useMutation({
        mutationFn: (userData: IUpdateUserData) => updateUserProfile(userData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.toast.success("Profile updated successfully");
        },
        onError: (error: any) => {
            toast.toast.error(error.response?.data?.message || "Failed to update profile");
        },
    })

    return { updateMutation , updatePending , updateIsError , updateError };
}
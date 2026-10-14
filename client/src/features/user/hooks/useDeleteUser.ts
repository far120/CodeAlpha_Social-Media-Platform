import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../api/user.api";
import { useToast } from "../../../components/Feedback/Toast";

export const useDeleteUserMutation = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const {mutate:deleteMutation , isPending:deletePending , isError:deleteIsError , error:deleteError} = useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.toast.success("User deleted successfully!");
        },
        onError: (error: any) => {
            toast.toast.error(error.response?.data?.message || "Failed to delete user");
        },
    })

    return { deleteMutation , deletePending , deleteIsError , deleteError };
}
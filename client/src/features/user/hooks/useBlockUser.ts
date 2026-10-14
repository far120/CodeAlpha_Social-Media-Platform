import { useMutation, useQueryClient } from "@tanstack/react-query"
import { blockUser } from "../api/user.api"
import { useToast } from "../../../components/Feedback/Toast";

export const useBlockUserMutation = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const {mutate:blockMutation , isPending:blockPending , isError:blockIsError , error:blockError} = useMutation({
        mutationFn: (id: string) => blockUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.toast.success("User blocked successfully!");
        },
        onError: (error: any) => {
            toast.toast.error(error.response?.data?.message || "Failed to block user");
        },
    })

    return { blockMutation , blockPending , blockIsError , blockError };
}
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { changeRoleUser } from "../api/user.api"
import { useToast } from "../../../components/Feedback/Toast";

export const useChangeRoleUserMutation = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const {mutate:changeRoleMutation , isPending:changeRolePending , isError:changeRoleIsError , error:changeRoleError} = useMutation({
        mutationFn: ({id,role}: {id: string , role:string}) => changeRoleUser(id , role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            toast.toast.success("User role changed successfully!");
        },
        onError: (error: any) => {
            toast.toast.error(error.response?.data?.message || "Failed to change user role");
        },
    })

    return { changeRoleMutation , changeRolePending , changeRoleIsError , changeRoleError };
}
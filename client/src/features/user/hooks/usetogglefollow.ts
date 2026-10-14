import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleFollow, getUserProfile } from "../api/user.api";

export const useToggleFollow = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => toggleFollow(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        },
    });
};  


export const useGetUserProfile = (id: string) => {
    return useQuery({
        queryKey: ["user-profile", id],
        queryFn: () => getUserProfile(id),
    });
};  
    
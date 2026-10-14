import { useMutation, useQueryClient } from "@tanstack/react-query";
import { aiAnalysis  } from "../api/user.api";

export const useAIAnalysisMutation = () => {
    const queryClient = useQueryClient();

    const {mutate:aiAnalysisMutation , isPending:aiPending , isError:aiIsError , error:aiError} = useMutation({
        mutationFn: () => aiAnalysis(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },
    })

    return { aiAnalysisMutation , aiPending , aiIsError , aiError };
}

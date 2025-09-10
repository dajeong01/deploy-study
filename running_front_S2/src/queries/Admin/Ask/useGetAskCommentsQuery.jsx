import { useQuery } from "@tanstack/react-query";
import { reqGetAskComment } from "../../../api/Admin/adminApi";

export const useGetAskCommentsQuery = (askId) => useQuery({
    queryKey: ["AskComments", askId],
    queryFn: async () => await reqGetAskComment(askId),
    staleTime: 1000 * 60,
    enabled: !!askId,
});
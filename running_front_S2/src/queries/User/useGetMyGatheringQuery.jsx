import { useQuery } from "@tanstack/react-query"
import { reqMyGatherings } from "../../api/User/UserApi";

function useGetMyGatheringQuery(userId) {
  return useQuery({
    queryKey: ["myGatherings", userId],
    queryFn: async () => {
      const res = await reqMyGatherings(userId);
      return res.data;
    },
    enabled: !!userId,
  });
}

export default useGetMyGatheringQuery;
import { useQuery } from "@tanstack/react-query"
import { reqMyCrews } from "../../api/User/UserApi";

function useGetMyCrewsQuery(userId) {
  return useQuery({
    queryKey: ["myCrews", userId],
    queryFn: async () => {
      const res = await reqMyCrews(userId);
      return res.data;
    },
    enabled: !!userId,
  })
}

export default useGetMyCrewsQuery;
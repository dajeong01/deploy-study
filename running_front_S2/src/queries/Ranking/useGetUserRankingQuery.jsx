import { useQuery } from "@tanstack/react-query";
import { reqUserRankings } from "../../api/Ranking/rankingApi";

function useGetUserRankingQuery() {
  return useQuery({
    queryKey: ["userRankings"],
    queryFn: async () => {
      const res = await reqUserRankings();
      return res.data.body;
    },
    staleTime: 1000 * 60 * 60 * 12,
    gcTime: 1000 * 60 * 60 * 13,
    retry: 3,
    refetchOnWindowFocus: false,
  })
}

export default useGetUserRankingQuery;
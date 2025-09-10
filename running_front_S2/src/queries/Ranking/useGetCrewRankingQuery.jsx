import { useQuery } from "@tanstack/react-query";
import { reqCrewRankings } from "../../api/Ranking/rankingApi";

function useGetCrewRankingQuery() {
  return useQuery({
    queryKey: ["crewRankings"],
    queryFn: async () => {
      const res = await reqCrewRankings();
      return res.data.body;
    },
    staleTime: 1000 * 60 * 60 * 12,
    gcTime: 1000 * 60 * 60 * 13,
    retry: 3,
    refetchOnWindowFocus: false,
  })
}

export default useGetCrewRankingQuery;
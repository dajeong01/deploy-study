import { useQuery } from "@tanstack/react-query"
import { reqCrewWelcomes } from "../../../api/Crew/welcomeApi";

function useGetCrewWelcomeListQuery(crewId) {
  return useQuery({
    queryKey: ["crewWelcomeList", crewId],
    queryFn: async () => {
      const res = await reqCrewWelcomes(crewId);
      return res.data;
    },
    staleTime: 0,
    gcTime: 0,
    enabled: !!crewId,
  })
}

export default useGetCrewWelcomeListQuery;
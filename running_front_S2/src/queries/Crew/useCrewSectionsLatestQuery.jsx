import { useQuery } from "@tanstack/react-query";
import { reqGetSectionsLatest } from "../../api/Crew/crewApi";

export default function useCrewSectionsLatestQuery(crewId) {
  return useQuery({
    queryKey: ["crewSectionsLatest", crewId],
    enabled: !!crewId,
    queryFn: async () => {
      const res = await reqGetSectionsLatest(crewId);
      const b = res?.data?.body || {};
      const toTs = (v) => (v ? Date.parse(v) : 0);
      return {
        members: toTs(b.members),
        gatherings: toTs(b.gatherings),
        freeBoards: toTs(b.freeBoards),
        albums: toTs(b.albums),
        notices: toTs(b.notices),
      };
    },
    
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}
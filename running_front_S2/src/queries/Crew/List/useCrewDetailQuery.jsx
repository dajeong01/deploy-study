import { useQuery } from "@tanstack/react-query"
import { reqCrewDetail } from "../../../api/Crew/crewApi";

function useCrewDetailQuery(crewId) {
  return useQuery({
    queryKey: ["crewDetail", crewId],
    queryFn: async () => {
      const res = await reqCrewDetail(crewId);
      return res.data;
    }
    
  })
}

export default useCrewDetailQuery;
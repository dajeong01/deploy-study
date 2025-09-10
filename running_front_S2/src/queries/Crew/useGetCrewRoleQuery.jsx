import { useQuery } from "@tanstack/react-query";
import { getCrewRole } from "../../api/Crew/crewApi";

function useGetCrewRoleQuery(userId) {
  return useQuery({
    queryKey: ["crewRoleByUserId",userId],
    queryFn: async () => {
      const res = await getCrewRole(userId);
      return res?.data?.body;
    },
    enabled: !!userId,
  });
}

export default useGetCrewRoleQuery;
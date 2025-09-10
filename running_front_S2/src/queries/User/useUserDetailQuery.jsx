import { useQuery } from "@tanstack/react-query";
import { reqGetMemberDetail } from "../../api/Crew/memberApi";

export default function useUserDetailQuery(memberId) {
  return useQuery({
    queryKey: ["userDetail", memberId],
    queryFn: async () => {
      const res = await reqGetMemberDetail(memberId);
      return res?.data?.body;
    },
    staleTime: 0,
    gcTime: 0,
    enabled: !!memberId,
  });
}

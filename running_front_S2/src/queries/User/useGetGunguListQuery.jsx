import { useQuery } from "@tanstack/react-query";
import { reqGunguList } from "../../api/Gungu/gungu";

function useGetGunguListQuery() {
  return useQuery({
    queryKey: ["gunguList"],
    queryFn: async () => {
      const res = await reqGunguList();
      return res;
    },
    staleTime: 60 * 1000,
  });
}

export default useGetGunguListQuery;
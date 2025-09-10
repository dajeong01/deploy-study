import { useQuery } from "@tanstack/react-query";
import { reqGetMyPosts } from "../../api/MyPost/myPost";

export default function useGetMyPostQuery({ page = 1, size = 10, searchText = "", src = "", crewId = "" }) {
  return useQuery({
    queryKey: ["myPosts", { page, size, searchText, src, crewId}],
    queryFn: () => reqGetMyPosts({ page, size, searchText, src, crewId}),
    staleTime: 5 * 100,
    keepPreviousData: true, 
  });
}

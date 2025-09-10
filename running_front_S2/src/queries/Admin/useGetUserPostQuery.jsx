import { useQuery } from "@tanstack/react-query";
import { reqGetUserPosts } from "../../api/Admin/adminApi";

export default function useGetUserPostQuery({
  page = 1,
  size = 10,
  searchText = "",
  src = "",
  crewId = "",
  userId, 
}) {
  return useQuery({
    queryKey: ["userPosts", { page, size, searchText, src, crewId, userId }],
    queryFn: () => reqGetUserPosts({ page, size, searchText, src, crewId, userId }),
    staleTime: 5 * 100,
    keepPreviousData: true,
  });
}
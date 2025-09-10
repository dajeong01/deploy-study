import { useInfiniteQuery } from "@tanstack/react-query";
import { reqGetCrewMembers } from "../../api/Crew/memberApi";

export default function useMembersQuery({ crewId, searchText = "", size = 20 }) {
  return useInfiniteQuery({
    queryKey: ["getCrewMembers", { crewId, searchText, size }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await reqGetCrewMembers({ crewId, page: pageParam, size, searchText });
      return res;
    },
    getNextPageParam: (lastPage, allPages) => {
      const body = lastPage?.data?.body;
      if (!body) return undefined;
      const currentPage = Number(body.page ?? allPages.length) || 1;
      const totalPages = Number(body.totalPages ?? 1) || 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 60000,
    keepPreviousData: true,
  });
}
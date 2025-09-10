import { useInfiniteQuery } from "@tanstack/react-query";
import { reqGetMarathons } from "../api/GlobalNotice/globalNoticeApi";


export default function useGetMarathonsInfiniteQuery({ size = 15, searchText = "", month = ""}) {
  return useInfiniteQuery({
    queryKey: ["marathons", { month, searchText, size }],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await reqGetMarathons({ month, page: pageParam, size, searchText });
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

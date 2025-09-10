// useGetCrewListQuery.jsx (수정안)
import { useInfiniteQuery } from "@tanstack/react-query";
import { reqGetCrewList } from '../../../api/Crew/crewApi';

function useGetCrewListQuery({ gunguId, searchText, size }) {
  return useInfiniteQuery({
    queryKey: [
      "getCrewList",
      { gunguId: gunguId ?? null, search: searchText ?? "", size },
    ],
    queryFn: async ({ pageParam = 1 }) =>
      await reqGetCrewList({
        page: pageParam,
        size,
        gunguId,
        searchText: searchText,
      }),
    getNextPageParam: (lastPage) => {
      const body = lastPage?.data?.body;
      if (!body) return undefined;

      const currentPage = Number(body.page ?? 1);
      const totalPages = Number(body.totalPages ?? 1);

      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    staleTime: 60 * 1000,
  });
}

export default useGetCrewListQuery;
import { useQuery } from "@tanstack/react-query";
import { reqGetGlobalFreeBoards } from "../../../api/GlobalFree/globalFreeApi";

export default function useGetGlobalBoardQuery({page = 1, size = 10, searchText = "" }) {
  return useQuery({
    queryKey: ["freeBoards", page, size, searchText],
    queryFn: () => reqGetGlobalFreeBoards({page, size, searchText }),
    keepPreviousData: true,     
    staleTime: 5 * 1000,
  });
}

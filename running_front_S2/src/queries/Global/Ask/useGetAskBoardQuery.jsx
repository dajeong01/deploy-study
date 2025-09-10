import { useQuery } from "@tanstack/react-query";
import { reqGetAskBoards } from "../../../api/Ask/askApi";

export default function useGetAskBoardQuery({page = 1, size = 10, searchText = "" }) {
  return useQuery({
    queryKey: ["askBoards", page, size, searchText],
    queryFn: () => reqGetAskBoards({page, size, searchText }),
    keepPreviousData: true,     
    staleTime: 5 * 1000,
  });
}

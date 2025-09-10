
import { useQuery } from "@tanstack/react-query";
import { reqGetFreeBoards } from "../../../api/Crew/freeboardApi";


export default function useGetCrewFreeBoardQuery({ crewId, page = 1, size = 10, searchText = "" }) {
  return useQuery({
    queryKey: ["freeBoards", crewId, page, size, searchText],
    queryFn: () => reqGetFreeBoards({ crewId, page, size, searchText }),
    keepPreviousData: true,     
    staleTime: 5 * 1000,
  });
}

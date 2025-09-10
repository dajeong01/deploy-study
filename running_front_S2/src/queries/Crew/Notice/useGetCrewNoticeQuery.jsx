import { useQuery } from "@tanstack/react-query";
import { reqGetNotices } from "../../../api/Crew/noticeApi";


export default function useGetCrewNotoiceQuery({ crewId, page = 1, size = 10, searchText = "" }) {
  return useQuery({
    queryKey: ["notices", crewId, page, size, searchText],
    queryFn: () => reqGetNotices({ crewId, page, size, searchText }),
    keepPreviousData: true,     
    staleTime: 5 * 1000,
  });
}

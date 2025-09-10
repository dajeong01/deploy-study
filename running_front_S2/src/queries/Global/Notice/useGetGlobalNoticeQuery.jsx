import { useQuery } from "@tanstack/react-query";
import { reqGetGlobalNotices } from "../../../api/GlobalNotice/globalNoticeApi";

export default function useGetGlobalNotoiceQuery({page = 1, size = 10, searchText = "" }) {
  return useQuery({
    queryKey: ["notices", page, size, searchText],
    queryFn: () => reqGetGlobalNotices({page, size, searchText }),
    keepPreviousData: true,     
    staleTime: 0
  });
}

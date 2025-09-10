import { useQuery } from '@tanstack/react-query';
import { reqGetGlobalFreeFeedDetail } from '../../../api/GlobalFree/globalFreeApi';

export default function useGetGlobalFreeBoardDetailQuery({ freeId, enabled = true }) {
  const fid = Number(freeId);

  return useQuery({
    queryKey: ['freeBoardDetail', fid],
    enabled: enabled && Number.isFinite(fid),
    queryFn: async () => {
      const res = await reqGetGlobalFreeFeedDetail(fid);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

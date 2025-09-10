import { useQuery } from '@tanstack/react-query';
import { reqGetAskDetail } from '../../../api/Ask/askApi';

export default function useGetAskDetailQuery({askId, enabled = true }) {
  const aid = Number(askId);

  return useQuery({
    queryKey: ['askDetail', aid],
    enabled: enabled&& Number.isFinite(aid),
    queryFn: async () => {
      const res = await reqGetAskDetail(aid);
      return res.data;
    },
    enabled: !!askId,
    staleTime: 5 * 1000,
  });
}

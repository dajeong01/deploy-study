
import { useQuery } from '@tanstack/react-query';
import { reqGetGlobalNoticeDetail } from '../../../api/GlobalNotice/globalNoticeApi';

export default function useGetGlobalNoticeDetailQuery({ noticeId, enabled = true }) {
  const nid = Number(noticeId);

  return useQuery({
    queryKey: ['noticeDetail', nid],
    enabled: enabled && Number.isFinite(nid),
    queryFn: async () => {
      const res = await reqGetGlobalNoticeDetail(nid);
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
}

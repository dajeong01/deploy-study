
import { useQuery } from '@tanstack/react-query';
import { reqGetNoticeDetail } from '../../../api/Crew/noticeApi';


export default function useGetCrewNoticeDetailQuery({ crewId, noticeId, enabled = true }) {
  const cid = Number(crewId);
  const nid = Number(noticeId);

  return useQuery({
    queryKey: ['noticeDetail', cid, nid],
    enabled: enabled && Number.isFinite(cid) && Number.isFinite(nid),
    queryFn: async () => {
      const res = await reqGetNoticeDetail(cid, nid);
      return res.data;
    },
    staleTime: 0
  });
}

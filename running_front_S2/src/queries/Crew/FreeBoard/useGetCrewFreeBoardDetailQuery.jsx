import { useQuery } from '@tanstack/react-query';
import { reqGetFreeFeedDetail } from '../../../api/Crew/freeboardApi';

export default function useGetCrewFreeBoardDetailQuery({ crewId, freeId, enabled = true }) {
  const cid = Number(crewId);
  const fid = Number(freeId);

  return useQuery({
    queryKey: ['freeBoardDetail', cid, fid],
    enabled: enabled && Number.isFinite(cid) && Number.isFinite(fid),
    queryFn: async () => {
      const res = await reqGetFreeFeedDetail(cid, fid);
      return res.data;
    },
    staleTime: 0
  });
}

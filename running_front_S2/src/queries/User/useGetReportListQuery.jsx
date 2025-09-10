import { useQuery } from '@tanstack/react-query';
import { reqGetReportList } from '../../api/Crew/reportApi';

export default function useGetReportListQuery({ crewId, enabled = true }) {
    // 경로 파라미터였다면 숫자로 정규화 (선택)
    const normalizedId = Number(crewId ?? '');

    return useQuery({
        queryKey: ['reportList', normalizedId],
        enabled: enabled && !!normalizedId,     // crewId가 있어야 실행
        queryFn: async () => {
            const res = await reqGetReportList(normalizedId); // ✅ 값만 넘기기
            return res.data;
        },
    });
}
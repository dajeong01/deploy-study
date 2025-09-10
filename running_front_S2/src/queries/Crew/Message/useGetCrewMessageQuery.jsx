import { useQuery } from '@tanstack/react-query';
import { reqGetMessage } from '../../../api/Crew/crewApi';

export default function useGetCrewMessage(crewId) {
    return useQuery({
        queryKey: ["messageList", crewId],
        enabled: !!crewId,               
        queryFn: async () => {
            const res = await reqGetMessage(crewId);
            const list = res?.data?.body ?? [];
            return list;
        },
        staleTime: 5_000,
    });
}
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { reqGetFreeCommentList } from '../../../api/Crew/freeboardApi';

function useGetCrewFreeCommentQuery(crewId,freeId) {
    return useQuery({
        queryKey: ["freeCommentList", crewId, freeId],
        queryFn: async () => {
            const res = await reqGetFreeCommentList(crewId,freeId);
            return res;
        },
        staleTime: 0
    })
}

export default useGetCrewFreeCommentQuery;
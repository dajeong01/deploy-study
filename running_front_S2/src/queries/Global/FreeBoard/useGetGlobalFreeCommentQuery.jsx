import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { reqGetGlobalFreeCommentList } from '../../../api/GlobalFree/globalFreeApi';

function useGetGlobalFreeCommentQuery(freeId) {
    return useQuery({
        queryKey: ["freeCommentList", freeId],
        queryFn: async () => {
            const res = await reqGetGlobalFreeCommentList(freeId);
            return res;
        },
        staleTime: 0
    })
}

export default useGetGlobalFreeCommentQuery;
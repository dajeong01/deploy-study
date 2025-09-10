import { useQuery } from '@tanstack/react-query';
import { reqSearchUsers } from '../../api/Admin/adminApi';

function useSearchUserQuery({ page, size, searchText }) {
    return useQuery({
        queryKey: ["searchUser", page, size, searchText],
        queryFn: async () => await reqSearchUsers({page, size, searchText}),
    });
}

export default useSearchUserQuery;
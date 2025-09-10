import { useQuery } from '@tanstack/react-query';
import { reqGetGlobalRoleAdmin } from '../../api/GlobalNotice/globalNoticeApi';

export default function useGetGlobalRoleAdminQuery(options = {}) {
  return useQuery({
    queryKey: ['globalRoleAdmin'],
    queryFn: async () => {
      const res = await reqGetGlobalRoleAdmin();
      return res?.data?.body ?? res?.data ?? res;
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  });
}
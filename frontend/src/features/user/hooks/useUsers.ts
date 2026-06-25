import { useQuery } from '@tanstack/react-query';
import userApi from '../api/userApi';
import { UserListParams } from '../types/user.types';

export const useUsers = (params?: UserListParams) => {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => userApi.getUsers(params),
    placeholderData: (previousData) => previousData, // Maintain previous list state during refetches
    staleTime: 1000 * 60 * 5, // 5 minutes cache lifetime
  });
};

export default useUsers;

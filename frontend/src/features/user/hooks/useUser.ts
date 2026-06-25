import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import userApi from '../api/userApi';
import { UpdateUserPayload } from '../types/user.types';
import { useAuthStore } from '../../../store/auth';

export const useUser = () => {
  const queryClient = useQueryClient();
  const { user: authUser, setUser } = useAuthStore();

  // Query profile if authenticated
  const profileQuery = useQuery({
    queryKey: ['profile', authUser?.id],
    queryFn: () => userApi.getProfile(),
    enabled: !!authUser,
    staleTime: 1000 * 60 * 10, // 10 minutes cache
  });

  // Mutation to update profile
  const updateProfileMutation = useMutation({
    mutationFn: (payload: UpdateUserPayload) => userApi.updateUser(authUser?.id || '', payload),
    onSuccess: (updatedUser) => {
      // Sync global auth store
      setUser({
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        role: updatedUser.role,
        permissions: updatedUser.permissions,
      });
      // Invalidate queries to trigger re-fetches
      queryClient.invalidateQueries({ queryKey: ['profile', updatedUser.id] });
    },
  });

  // Mutation to delete a user
  const deleteUserMutation = useMutation({
    mutationFn: (id: string) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    profile: profileQuery.data,
    isLoadingProfile: profileQuery.isLoading,
    profileError: profileQuery.error,

    updateProfile: updateProfileMutation.mutateAsync,
    isUpdatingProfile: updateProfileMutation.isPending,

    deleteUser: deleteUserMutation.mutateAsync,
    isDeletingUser: deleteUserMutation.isPending,
  };
};

export default useUser;

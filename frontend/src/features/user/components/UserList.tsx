import React from 'react';
import { User } from '../types/user.types';
import UserCard from './UserCard';
import { Loader2 } from 'lucide-react';

interface UserListProps {
  users?: User[];
  isLoading: boolean;
  error: Error | null;
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
  deletingId?: string | null;
}

export const UserList: React.FC<UserListProps> = ({
  users = [],
  isLoading,
  error,
  onEdit,
  onDelete,
  deletingId = null,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
        <span className="text-sm">Fetching user records...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel border-rose-500/20 bg-rose-500/5 text-rose-300 rounded-xl p-6 text-center max-w-lg mx-auto">
        <h4 className="font-semibold text-lg">Error Loading Users</h4>
        <p className="text-sm text-rose-400/80 mt-1">{error.message || 'An error occurred during fetch.'}</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="glass-panel rounded-xl p-8 text-center text-slate-400">
        <p className="text-sm">No user accounts found matching this criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
          isDeleting={deletingId === user.id}
        />
      ))}
    </div>
  );
};

export default UserList;

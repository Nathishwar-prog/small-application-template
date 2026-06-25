import React, { useState } from 'react';
import useUsers from '../hooks/useUsers';
import useUser from '../hooks/useUser';
import UserList from '../components/UserList';
import { Users, UserPlus, RefreshCw } from 'lucide-react';

export const UsersListPage: React.FC = () => {
  const [params] = useState({ skip: 0, take: 24 });
  const { data: users, isLoading, error, refetch, isRefetching } = useUsers(params);
  const { deleteUser } = useUser();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This cannot be undone.')) {
      try {
        setDeletingId(id);
        await deleteUser(id);
      } catch (err) {
        alert('Failed to delete user.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wider uppercase">
            <Users className="w-4 h-4" />
            <span>Management Console</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100 font-sans mt-1">Users Directory</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Administer global system roles, active sessions, and access permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isLoading || isRefetching}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700 hover:bg-slate-800/80 transition-colors disabled:opacity-50"
            aria-label="Refresh user list"
          >
            <RefreshCw className={`w-4 h-4 ${isRefetching ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={() =>
              alert('Add User dialog (TODO marker for implementation in future projects)')
            }
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus className="w-4 h-4" />
            <span>Invite User</span>
          </button>
        </div>
      </div>

      {/* Directory Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="glass-panel rounded-xl p-4.5">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Total Accounts
          </span>
          <div className="text-2xl font-bold text-slate-200 mt-1">{users?.length || 0}</div>
        </div>
        <div className="glass-panel rounded-xl p-4.5">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Administrator Roles
          </span>
          <div className="text-2xl font-bold text-amber-400 mt-1">
            {users?.filter((u) => u.role === 'ADMIN' || u.role === 'SUPER_ADMIN').length || 0}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-4.5">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
            Standard Users
          </span>
          <div className="text-2xl font-bold text-sky-400 mt-1">
            {users?.filter((u) => u.role === 'USER').length || 0}
          </div>
        </div>
      </div>

      {/* List Component */}
      <UserList
        users={users}
        isLoading={isLoading}
        error={error}
        onDelete={handleDelete}
        deletingId={deletingId}
      />
    </div>
  );
};

export default UsersListPage;

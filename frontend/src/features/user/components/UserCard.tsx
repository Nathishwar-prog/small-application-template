import React from 'react';
import { User, UserRole } from '../types/user.types';
import { Mail, Trash2, Edit3, Calendar } from 'lucide-react';

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export const UserCard: React.FC<UserCardProps> = ({
  user,
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/25';
      case 'ADMIN':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/25';
      case 'MANAGER':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/25';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="glass-panel glass-panel-hover rounded-xl p-5 relative overflow-hidden transition-all duration-300 group hover:-translate-y-1">
      {/* Decorative colored glow on card borders */}
      <div className="absolute top-0 left-0 w-2 h-full bg-indigo-500/40 rounded-l" />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-semibold text-lg">
            {user.firstName ? user.firstName[0].toUpperCase() : user.email[0].toUpperCase()}
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
              {user.firstName || user.lastName
                ? `${user.firstName || ''} ${user.lastName || ''}`.trim()
                : 'Enterprise Member'}
            </h4>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${getRoleColor(user.role)}`}>
          {user.role}
        </span>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(user)}
              className="p-1.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              aria-label="Edit user"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(user.id)}
              disabled={isDeleting}
              className="p-1.5 rounded bg-slate-800/50 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors disabled:opacity-50"
              aria-label="Delete user"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;

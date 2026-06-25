import React from 'react';
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/auth';
import UsersListPage from '../features/user/pages/UsersListPage';
import UserProfilePage from '../features/user/pages/UserProfilePage';
import { Users, User, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react';

// --- Protected Route Guard ---
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

// --- App Layout ---
export const AppLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-full min-h-screen bg-slate-950 text-slate-100">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-900 bg-slate-900/30 flex flex-col">
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-900">
          <ShieldCheck className="w-6 h-6 text-indigo-500" />
          <span className="font-bold font-sans tracking-wide text-indigo-100">Enterprise Template</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 py-6 px-4 space-y-1">
          <Link
            to="/"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/')
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </Link>

          {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
            <Link
              to="/users"
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive('/users')
                  ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Users Directory</span>
            </Link>
          )}

          <Link
            to="/profile"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive('/profile')
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile Settings</span>
          </Link>
        </nav>

        {/* User profile brief & logout footer */}
        <div className="p-4 border-t border-slate-900 bg-slate-950/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
              {user?.email[0].toUpperCase()}
            </div>
            <div className="truncate">
              <span className="block text-xs font-semibold text-slate-300 truncate">
                {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : 'Active Member'}
              </span>
              <span className="block text-[10px] text-slate-500 truncate">{user?.email}</span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-1.5 px-3 border border-slate-800 bg-slate-900 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 text-xs font-semibold rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Content Top Bar */}
        <header className="h-16 border-b border-slate-900 flex items-center px-8 justify-end bg-slate-950/40">
          <div className="text-xs text-slate-500 font-mono">
            Environment: <span className="text-indigo-400">development</span>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route
              path="/"
              element={
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Welcome to your Dashboard</h2>
                  <p className="text-slate-400 text-sm max-w-2xl">
                    This is a pre-configured enterprise landing template. Adjust routes and views under `frontend/src/routes/index.tsx` to mount your domain modules.
                  </p>
                  <div className="h-48 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-slate-600 text-sm">
                    Dashboard Panels / Analytics Widgets Placeholder (TODO marker for future projects)
                  </div>
                </div>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
                  <UsersListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unauthorized"
              element={
                <div className="text-center py-12 text-slate-400">
                  <h3 className="text-lg font-bold text-rose-400">Access Denied</h3>
                  <p className="text-sm mt-1">You do not have administrative privileges to view this directory.</p>
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// --- Auth Views ---
export const LoginPage: React.FC = () => {
  const { setCredentials } = useAuthStore();
  const navigate = useNavigate();

  const handleDemoLogin = (role: 'SUPER_ADMIN' | 'USER') => {
    // Boilerplate login simulation for template verification
    setCredentials(
      {
        id: role === 'SUPER_ADMIN' ? 'admin-uuid' : 'user-uuid',
        email: role === 'SUPER_ADMIN' ? 'admin@enterprise.com' : 'user@enterprise.com',
        firstName: role === 'SUPER_ADMIN' ? 'System' : 'Jane',
        lastName: role === 'SUPER_ADMIN' ? 'Administrator' : 'Doe',
        role,
        permissions: role === 'SUPER_ADMIN' ? ['*'] : ['users:read'],
      },
      'simulated-access-token'
    );
    navigate('/');
  };

  return (
    <div className="h-full min-h-screen flex items-center justify-center px-4 bg-slate-950">
      <div className="glass-panel rounded-2xl w-full max-w-md p-8 text-center space-y-6 glow-primary">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="w-10 h-10 text-indigo-500" />
          <h2 className="text-2xl font-bold font-sans text-slate-100">Enterprise Starter</h2>
          <p className="text-xs text-slate-500">Secure Token Authentication Verification console</p>
        </div>

        <div className="space-y-3 pt-4">
          <button
            onClick={() => handleDemoLogin('SUPER_ADMIN')}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-lg transition-colors"
          >
            Authenticate as Super Admin
          </button>
          <button
            onClick={() => handleDemoLogin('USER')}
            className="w-full py-2.5 border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white font-medium text-sm rounded-lg transition-colors"
          >
            Authenticate as Standard User
          </button>
        </div>

        <p className="text-[10px] text-slate-500">
          This is a template sign-in verification page. Hook up `userApi.login()` inside submit callbacks for production setups.
        </p>
      </div>
    </div>
  );
};

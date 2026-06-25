import React from 'react';
import useUser from '../hooks/useUser';
import UserForm from '../components/UserForm';
import { UserFormValues } from '../validation/user.validation';
import { Shield, Key, User as UserIcon } from 'lucide-react';

export const UserProfilePage: React.FC = () => {
  const { profile, isLoadingProfile, profileError, updateProfile, isUpdatingProfile } = useUser();

  const handleUpdate = async (values: UserFormValues) => {
    try {
      await updateProfile({
        email: values.email,
        firstName: values.firstName || undefined,
        lastName: values.lastName || undefined,
        role: values.role,
        password: values.password || undefined,
      });
      alert('Profile updated successfully!');
    } catch (error) {
      // Handled inside UserForm component validation state
      throw error;
    }
  };

  if (isLoadingProfile) {
    return (
      <div className="flex items-center justify-center py-12 text-slate-400">
        <span>Loading profile settings...</span>
      </div>
    );
  }

  if (profileError || !profile) {
    return (
      <div className="glass-panel border-rose-500/20 bg-rose-500/5 text-rose-300 rounded-xl p-6 text-center max-w-lg mx-auto">
        <h4 className="font-semibold text-lg">Error Loading Profile</h4>
        <p className="text-sm mt-1">{profileError?.message || 'Could not fetch your profile details.'}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Settings Form */}
      <div className="lg:col-span-2 space-y-6">
        <div className="glass-panel rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wider uppercase mb-1">
            <UserIcon className="w-4 h-4" />
            <span>Personal Settings</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Account Profile</h2>
          <p className="text-slate-400 text-sm mt-0.5 mb-6">
            Modify details, update login credentials, or adjust your workspace role.
          </p>

          <UserForm
            initialValues={profile}
            onSubmit={handleUpdate}
            isLoading={isUpdatingProfile}
          />
        </div>
      </div>

      {/* Permissions / Info Sidebar */}
      <div className="space-y-6">
        {/* Access Privileges */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h3>Access Control</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Active Role</span>
              <span className="inline-block mt-1 text-xs px-2 py-0.5 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded font-bold uppercase">
                {profile.role}
              </span>
            </div>

            <div>
              <span className="block text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2">Granted Permissions</span>
              <div className="flex flex-wrap gap-1.5">
                {profile.permissions.map((perm) => (
                  <span
                    key={perm}
                    className="text-[10px] bg-slate-900 border border-slate-800 text-slate-300 font-mono px-2 py-0.5 rounded"
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Security / JWT Information */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 font-semibold text-slate-200">
            <Key className="w-5 h-5 text-indigo-400" />
            <h3>Token Information</h3>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            Your login session is secured using standard JSON Web Tokens. Access tokens rotate automatically, and refresh cookies are stored securely via HTTPOnly configurations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

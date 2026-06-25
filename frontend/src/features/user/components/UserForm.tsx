import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { userFormSchema, UserFormValues } from '../validation/user.validation';
import { User } from '../types/user.types';
import { Loader2 } from 'lucide-react';

interface UserFormProps {
  initialValues?: User;
  onSubmit: (values: UserFormValues) => Promise<void>;
  isLoading?: boolean;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  isLoading = false,
}) => {
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const { register, handleSubmit } = useForm<UserFormValues>({
    defaultValues: {
      email: initialValues?.email || '',
      firstName: initialValues?.firstName || '',
      lastName: initialValues?.lastName || '',
      role: initialValues?.role || 'USER',
      password: '',
    },
  });

  const handleFormSubmit = async (data: UserFormValues) => {
    setValidationErrors({});

    // Validate values using Zod schema
    const result = userFormSchema.safeParse(data);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setValidationErrors(errors);
      return;
    }

    try {
      await onSubmit(data);
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };
      setValidationErrors({
        form:
          error.response?.data?.message || error.message || 'An error occurred during submission.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5 animate-fade-in">
      {validationErrors.form && (
        <div className="p-3.5 bg-rose-500/10 border border-rose-500/25 rounded-lg text-rose-400 text-sm">
          {validationErrors.form}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
          >
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            {...register('firstName')}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Jane"
          />
          {validationErrors.firstName && (
            <span className="text-xs text-rose-400 mt-1 block">{validationErrors.firstName}</span>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
          >
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            {...register('lastName')}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
            placeholder="Doe"
          />
          {validationErrors.lastName && (
            <span className="text-xs text-rose-400 mt-1 block">{validationErrors.lastName}</span>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="jane.doe@enterprise.com"
        />
        {validationErrors.email && (
          <span className="text-xs text-rose-400 mt-1 block">{validationErrors.email}</span>
        )}
      </div>

      <div>
        <label
          htmlFor="role"
          className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
        >
          Workspace Access Role
        </label>
        <select
          id="role"
          {...register('role')}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
        >
          <option value="USER">User (Standard Access)</option>
          <option value="MANAGER">Manager (Team Management)</option>
          <option value="ADMIN">Admin (Directory Control)</option>
          <option value="SUPER_ADMIN">Super Admin (System Root)</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5"
        >
          Password {initialValues && '(leave empty to keep unchanged)'}
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
          placeholder="••••••••"
        />
        {validationErrors.password && (
          <span className="text-xs text-rose-400 mt-1 block">{validationErrors.password}</span>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Saving Profile...</span>
            </>
          ) : (
            <span>Save Profile Settings</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;

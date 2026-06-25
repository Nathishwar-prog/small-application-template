import React from 'react';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading details...',
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 gap-2 text-slate-400 ${className}`}>
      <Loader className="w-6 h-6 animate-spin text-indigo-500" />
      {message && <span className="text-xs font-medium tracking-wide">{message}</span>}
    </div>
  );
};

export default LoadingSpinner;

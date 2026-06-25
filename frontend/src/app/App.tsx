import React from 'react';

/**
 * ROOT APP CONTAINER WRAPPER
 *
 * Sets up global provider wrappers (such as ThemeContext, Toast notifications,
 * modal overlay controls).
 */
interface AppProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProps> = ({ children }) => {
  return <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">{children}</div>;
};

export default AppProvider;

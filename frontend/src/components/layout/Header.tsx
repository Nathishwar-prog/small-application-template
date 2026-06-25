import React from 'react';

/**
 * APPLICATION INNER LAYOUT HEADER
 * 
 * Fits at the top of the main layout, exposing page locations, breadcrumbs, 
 * or search bars.
 */
interface HeaderProps {
  title?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, actions }) => {
  return (
    <header className="h-16 border-b border-slate-900 px-8 flex items-center justify-between bg-slate-950/40">
      {title && <h1 className="font-semibold text-slate-200 text-sm">{title}</h1>}
      {actions && <div className="flex items-center gap-3">{actions}</div>}
    </header>
  );
};

export default Header;

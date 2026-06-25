import React from 'react';

/**
 * DASHBOARD LANDING PAGE
 * 
 * Central view container template.
 */
export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Workspace Overview</h2>
      <p className="text-slate-400 text-sm">Welcome to your dashboard.</p>
    </div>
  );
};

export default Dashboard;

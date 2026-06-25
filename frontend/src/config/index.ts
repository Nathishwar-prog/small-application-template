/**
 * FRONTEND APP ENVIRONMENT CONFIGURATIONS
 * 
 * Centralize all constants mapped from Vite VITE_ environmental variables.
 */
export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || 'Enterprise Client',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  environment: import.meta.env.MODE || 'development',
};

export default appConfig;

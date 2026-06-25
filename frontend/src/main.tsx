import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout, LoginPage } from './routes';
import './index.css';

// Initialize TanStack Query client for fetching/caching operations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Prevent redundant requests when switching OS tabs
      retry: 1, // Max retries on failure before throwing errors
      staleTime: 1000 * 60 * 5, // 5 minutes standard stale cache duration
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Main Auth Console Route */}
          <Route path="/login" element={<LoginPage />} />

          {/* Base Layout containing nested dashboards & protected layouts */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);

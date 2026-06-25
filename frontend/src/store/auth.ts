import { create } from 'zustand';

export interface UserState {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  permissions: string[];
}

interface AuthStore {
  user: UserState | null;
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: UserState | null) => void;
  setCredentials: (user: UserState, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setToken: (token) =>
    set((state) => ({
      token,
      isAuthenticated: !!token && !!state.user,
    })),

  setUser: (user) =>
    set((state) => ({
      user,
      isAuthenticated: !!state.token && !!user,
    })),

  setCredentials: (user, token) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),

  logout: () => {
    // Clear in-memory credentials
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));

export default useAuthStore;

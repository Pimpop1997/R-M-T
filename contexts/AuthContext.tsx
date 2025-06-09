import { create } from 'zustand';
import supabase from '../utils/supabaseClient';

interface AuthState {
  user: any;
  setUser: (user: any) => void;
  checkSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  checkSession: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user || null });
  },
}));

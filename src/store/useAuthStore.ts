import type { User } from "@supabase/supabase-js";
import type { UserProfile } from "@/api/mapper/types";
import { createSubscribedZustandStore } from "@/store/store";

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  profile: UserProfile | null;
};

type AuthAction = {
  login: () => void;
  logout: () => void;
  updateIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
};

const initialState = {
  isLoggedIn: false,
  user: null,
  profile: null,
};

export const useAuthStore = createSubscribedZustandStore<AuthState & AuthAction>("user-storage", (set, get) => ({
  ...initialState,
  login: () => get().updateIsLoggedIn(true),
  logout: () => {
    get().updateIsLoggedIn(false);
    get().setProfile(null);
  },
  updateIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
}))
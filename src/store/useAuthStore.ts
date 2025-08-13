import type { Tables } from "@/types/supabase.types";
import type { User } from "@supabase/supabase-js";
import { createSubscribedZustandStore } from "@/store/store";
type Profile = Tables<"user_profiles">;

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
  profile: Profile | null;
};

type AuthAction = {
  login: () => void;
  logout: () => void;
  updateIsLoggedIn: (isLoggedIn: boolean) => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: Profile | null) => void;
};

const initialState = {
  isLoggedIn: false,
  user: null,
  profile: null,
};

export const useAuthStore = createSubscribedZustandStore<AuthState & AuthAction>((set, get) => ({
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
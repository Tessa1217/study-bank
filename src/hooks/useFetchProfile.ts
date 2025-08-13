import { getUserProfile } from "@/api/profile.api";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
export function useFetchProfile() {
  const { user, setProfile } = useAuthStore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data } = await getUserProfile();
        setProfile(data);
      }
    };

    fetchUserProfile();
  }, [user]);
}

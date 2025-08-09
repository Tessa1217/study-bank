import { getUserProfile } from "@/services/profile.service";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
export function useFetchProfile() {
  const { user, setProfile } = useAuthStore();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const data = await getUserProfile(user.id);
        setProfile(data);
      }
    };

    fetchUserProfile();
  }, [user]);
}

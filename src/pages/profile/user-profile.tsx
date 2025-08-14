import { useAuthStore } from "@/store/useAuthStore";
import { Navigate } from "react-router-dom";
const UserProfile = () => {
  const profile = useAuthStore((state) => state.profile);

  if (!profile) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">사용자 설정</h2>
    </div>
  );
};

export default UserProfile;

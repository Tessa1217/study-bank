import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useSupabaseAuthSessionListener } from "@/hooks/useSupabaseAuthSessionListener";
const GuardedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const { isReady } = useSupabaseAuthSessionListener();

  if (!isReady) {
    return <div>loading...</div>;
  }

  return user?.id ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default GuardedRoute;

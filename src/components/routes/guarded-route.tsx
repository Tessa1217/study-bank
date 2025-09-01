import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { useSupabaseAuthSessionListener } from "@/hooks/useSupabaseAuthSessionListener";
import LoadingSpinner from "@/components/ui/loading";
const GuardedRoute = () => {
  const user = useAuthStore((state) => state.user);
  const { isReady } = useSupabaseAuthSessionListener();

  if (!isReady) {
    return <LoadingSpinner />;
  }

  return user?.id ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default GuardedRoute;

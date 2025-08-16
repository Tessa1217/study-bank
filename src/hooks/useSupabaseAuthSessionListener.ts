import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useProfileQuery } from "@/hooks/queries/useProfileQuery";

/**
 * Supabase 인증 세션의 변경 사항을 수신하고 AuthStore를 업데이트하는 훅
 * @returns {object} isReady: boolean - 인증 상태 확인이 완료되었는지 여부
 */
export function useSupabaseAuthSessionListener() {
  
  const user = useAuthStore((state) => state.user)
  const setProfile = useAuthStore((state) => state.setProfile)    
  const setUser = useAuthStore((state) => state.setUser);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      // 1. 컴포넌트 마운트 시 현재 세션 정보를 확인
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session ? session.user : null);

      // 2. 인증 상태 변경 이벤트 리스너 등록
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          if (session) {
            setUser(session.user);
          } else {
            // 로그아웃 시
            setUser(null);
          }
        }
      );

      // 세션 확인 및 리스너 등록이 모두 완료되면 isReady 상태를 true로 변경
      setIsReady(true);

      // 컴포넌트 언마운트 시 리스너 해제
      return () => {
        authListener.subscription.unsubscribe();
      };
    };

    checkSession();
  }, [setUser]);

  // 유저 변경 시 프로파일 반영
  const { data:userProfile } = useProfileQuery(user?.id ?? undefined)  

  useEffect(() => {
    if (user?.id && userProfile) {
      setProfile(userProfile)
    } else if (!user) {
      setProfile(null)
    }
  }, [user?.id, userProfile, setProfile])

  return { isReady };
}

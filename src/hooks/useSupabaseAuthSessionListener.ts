import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * Supabase 인증 세션의 변경 사항을 수신하고 AuthStore를 업데이트하는 훅
 * @returns {object} isReady: boolean - 인증 상태 확인이 완료되었는지 여부
 */
export function useSupabaseAuthSessionListener() {
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

  return { isReady };
}

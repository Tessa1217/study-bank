import { callEdge } from "@/api/shared/edge";
import { useEffect, useRef } from "react";

export type ProgressPayload = {
  user_id: string;
  set_id: string;
  completed_count: number;
  total_count: number;
  accuracy: number;           // 0~1
  total_study_ms: number;     // 포커스된 시간만 누적
  last_learned_at: string;    // ISO
  streak_days: number;
  updated_at: string;         // ISO
  idempotency_key?: string;
};

type Opts = {
  getPayload: () => ProgressPayload;
  beaconUrl: string;
  autosaveIntervalMs?: number;
};

/**
 * 진행도 자동 저장 훅
 * - 15s 간격 autosave (리더 탭만)
 * - pagehide/visibilitychange 시 sendBeacon 플러시
 * - 로컬 스냅샷 백업
 * - flushNow() 수동 저장 제공
 */
export function useStudyProgressAutosave({
  getPayload,
  beaconUrl,
  autosaveIntervalMs = 15_000,
}: Opts) {
  const intervalRef = useRef<number | null>(null);
  const isLeaderRef = useRef<boolean>(false);
  const lastSavedRef = useRef<number>(0);

  const flush = async (reason: "interval" | "pagehide" | "hidden" | "manual") => {        
    
    const payload = getPayload()

    // 로컬 백업
    try {
      localStorage.setItem(
        `progress:${payload.user_id}:${payload.set_id}`,
        JSON.stringify(payload)
      );
    } catch {}

    if (reason === "pagehide" || reason === "hidden") {      
      await callEdge("study-progress-beacon", payload, { keepalive: true }); // 언로드 전송
    } else {
      await callEdge("study-progress-beacon", payload); // 일반 전송
    }

    lastSavedRef.current = Date.now();
  };

  // 간단 리더 선출(다중 탭 중 주기 저장만 담당)
  useEffect(() => {
    const key = "study-progress-leader";
    const me = `${performance.now()}-${Math.random()}`;
    const electLeader = () => {
      const current = localStorage.getItem(key);
      if (!current) localStorage.setItem(key, me);
      isLeaderRef.current = localStorage.getItem(key) === me;
    };

    electLeader();
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) electLeader();
    };
    window.addEventListener("storage", onStorage);

    const reelection = window.setInterval(electLeader, 5000);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.clearInterval(reelection);
      if (isLeaderRef.current) {
        try {
          const v = localStorage.getItem(key);
          if (v && v === me) localStorage.removeItem(key);
        } catch {}
      }
    };
  }, []);

  // 주기 저장(리더 탭만 수행)
  useEffect(() => {
    const tick = () => {
      if (!isLeaderRef.current) return;
      const now = Date.now();
      if (now - lastSavedRef.current >= autosaveIntervalMs) {
        flush("interval");
      }
    };

    // 1초 heartbeat
    // @ts-ignore
    intervalRef.current = window.setInterval(tick, 1000);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [autosaveIntervalMs]);

  // 페이지 이탈/숨김 시 플러시
  useEffect(() => {
    const onPageHide = () => flush("pagehide");
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush("hidden");
    };

    window.addEventListener("pagehide", onPageHide, { capture: true });
    document.addEventListener("visibilitychange", onVisibility, { capture: true });

    return () => {
      window.removeEventListener("pagehide", onPageHide, { capture: true } as any);
      document.removeEventListener("visibilitychange", onVisibility, { capture: true } as any);
    };
  }, []);

  return { flushNow: () => flush("manual") };
}
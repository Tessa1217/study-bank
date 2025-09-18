import { useRef, useState, useEffect } from "react";
import { type MatchCardProps } from "@/hooks/useMatchCard";
import { useIntervalMutation } from "@/hooks/useIntervalMutation";
import { type StudyMatchGameSessionSummary } from "@/api/mapper/types";
import { insertStudyMatchGameSession } from "@/api/study-match-game-session.api";
import { toStudyMatchCardSessionDTO } from "@/api/mapper/mapper";
import { useAuthStore } from "@/store/useAuthStore";

type MatchCardStatProps = {
  setId: string;
  userId: string;
  isGameStarted: boolean;
  isGameWon: boolean;
  selectedCards: MatchCardProps[];
  matchedPairs: string[];
};

export function useMatchCardStat({
  setId,
  userId,
  isGameStarted,
  isGameWon,
  selectedCards,
  matchedPairs,
}: MatchCardStatProps) {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [attempts, setAttempts] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [gameTime, setGameTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (!isGameStarted || isGameWon) return;
    initMatchCardTimeState();
    initMatchCardTimerState();
  }, [isGameStarted, isGameWon]);

  const initMatchCardTimeState = () => {
    setSessionId(undefined);
    setAttempts(0);
    setStartTime(Date.now());
  };

  // initialize time state
  const initMatchCardTimerState = () => {
    resetTime();
    startGameTimer();
  };

  // Game Timer
  const startGameTimer = () => {
    if (timerRef.current) stopGameTimer();
    timerRef.current = setInterval(
      () => setGameTime((prevTime) => Number((prevTime + 0.1).toFixed(1))),
      100
    );
  };

  const stopGameTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetTime = () => setGameTime(0);

  // 종료 시 타이머 종료
  useEffect(() => {
    if (isGameWon) {
      stopGameTimer();
    }
  }, [isGameWon]);

  useEffect(() => {
    // 카드 쌍 뒤집었을 때
    if (selectedCards.length === 2) {
      setAttempts((prevAttempt) => prevAttempt + 1);
    }
  }, [selectedCards]);

  const saveGameProgress = (payload: StudyMatchGameSessionSummary) => {
    return insertStudyMatchGameSession(toStudyMatchCardSessionDTO(payload));
  };

  useIntervalMutation<StudyMatchGameSessionSummary>({
    payload: {
      id: sessionId,
      setId,
      userId,
      startTime,
      endTime: isGameWon ? Date.now() : null,
      totalTime: gameTime,
      attempts,
      correctMatches: matchedPairs.length,
      wrongMatches: attempts - matchedPairs.length,
    },
    mutationFn: saveGameProgress,
    onSuccess: (data) => {
      setSessionId(data as string);
    },
    interval: 5000,
    enabled: isGameStarted && !isGameWon,
    isFinal: isGameWon,
  });

  return {
    gameTime,
  };
}

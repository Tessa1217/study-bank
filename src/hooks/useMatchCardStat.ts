import { useRef, useState, useEffect } from "react";
import { type MatchCardProps } from "@/hooks/useMatchCard";

type MatchCardStatProps = {
  isGameStarted: boolean;
  isGameWon: boolean;
  selectedCards: MatchCardProps[];
  matchedPairs: string[];
};

export function useMatchCardStat({
  isGameStarted,
  isGameWon,
  selectedCards,
  matchedPairs,
}: MatchCardStatProps) {
  const [attempts, setAttempts] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [gameTime, setGameTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);

  useEffect(() => {
    if (!isGameStarted || isGameWon) return;
    initMatchCardTimeState();
    initMatchCardTimerState();
  }, [isGameStarted, isGameWon]);

  const initMatchCardTimeState = () => {
    setAttempts(0);
    setStartTime(Date.now());
    setEndTime(null);
  };

  // initialize time state
  const initMatchCardTimerState = () => {
    resetTime();
    startGameTimer();
  };

  // Game Timer
  const startGameTimer = () => {
    if (timerRef.current) timerRef.current = null;
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
    const payload = {
      startTime,
      endTime,
      gameTime,
      attempts,
      correctMatches: matchedPairs.length,
    };
  }, [isGameWon]);

  useEffect(() => {
    // 카드 쌍 뒤집었을 때
    if (selectedCards.length === 2) {
      setAttempts((prevAttempt) => prevAttempt + 1);
    }
  }, [selectedCards]);

  return {
    gameTime,
  };
}

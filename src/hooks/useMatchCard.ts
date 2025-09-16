import { useMemo, useState, useRef, useEffect } from "react";
import type { StudyCardDraft } from "@/api/mapper/types";
import { shuffleArray } from "@/utils/array";

type MatchCardProps = {
  id: string;
  pairId: string;
  text: string;
};

export function useMatchCard(cards: StudyCardDraft[] | undefined) {
  const [gameItems, setGameItems] = useState<MatchCardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCardProps[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [erroredCards, setErroredCards] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(null);
  const [gameTime, setGameTime] = useState(0);

  const setupGame = () => {
    if (!cards) return;
    const items: MatchCardProps[] = cards.flatMap((card) => [
      { id: `word-${card.id}`, pairId: card.id, text: card.word },
      { id: `def-${card.id}`, pairId: card.id, text: card.definition },
    ]);
    setGameItems(shuffleArray(items));
    setSelectedCards([]);
    setMatchedPairs([]);
    setIsChecking(false);
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

  useEffect(() => {
    setupGame();
    return () => {
      stopGameTimer();
      resetTime();
    };
  }, [cards]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      setIsChecking(true);
      const [firstCard, secondCard] = selectedCards;
      if (firstCard.pairId === secondCard.pairId) {
        setMatchedPairs((prev) => [...prev, firstCard.pairId]);
        setSelectedCards([]);
        setIsChecking(false);
      } else {
        setErroredCards([firstCard.id, secondCard.id]);
        setTimeout(() => {
          setSelectedCards([]);
          setErroredCards([]);
          setIsChecking(false);
        }, 800);
      }
    }
  }, [selectedCards]);

  const onCardClick = (card: MatchCardProps) => {
    if (isChecking || matchedPairs.includes(card.pairId)) {
      return;
    }
    if (selectedCards.some((c) => c.id === card.id)) {
      setSelectedCards([]);
      return;
    }
    setSelectedCards((prev) => [...prev, card]);
  };

  // 게임 종료
  const isGameWon = useMemo(() => {
    if (!cards || cards.length === 0) return false;
    return matchedPairs.length === cards.length;
  }, [matchedPairs, cards]);

  // 종료 시 타이머 종료
  useEffect(() => {
    if (isGameWon) stopGameTimer();
  }, [isGameWon]);

  return {
    setupGame,
    gameItems,
    selectedCards,
    matchedPairs,
    erroredCards,
    onCardClick,
    isGameWon,
    gameTime,
  };
}

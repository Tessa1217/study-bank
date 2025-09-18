import { useMemo, useState, useEffect, useRef } from "react";
import type { StudyCardDraft } from "@/api/mapper/types";
import { shuffleArray } from "@/utils/array";

export type MatchCardProps = {
  id: string;
  pairId: string;
  text: string;
};

export function useMatchCard(cards: StudyCardDraft[] | undefined) {
  const [gameItems, setGameItems] = useState<MatchCardProps[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCardProps[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [erroredCards, setErroredCards] = useState<string[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // set up new game
  const setupGame = () => {
    if (!cards) return;
    setGameItems(initGameGards(cards));
    resetGameState();
  };

  // initialize game card
  const initGameGards = (cards: StudyCardDraft[]): MatchCardProps[] => {
    return shuffleArray(
      cards.flatMap((card) => [
        { id: `word-${card.id}`, pairId: card.id, text: card.word },
        { id: `def-${card.id}`, pairId: card.id, text: card.definition },
      ])
    );
  };

  // game state reset
  const resetGameState = () => {
    setSelectedCards([]);
    setErroredCards([]);
    setMatchedPairs([]);
    setIsChecking(false);
    setIsGameStarted(true);
  };

  useEffect(() => {
    setupGame();
  }, [cards]);

  // turn off game start
  useEffect(() => {
    return () => setIsGameStarted(false);
  }, []);

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
        // 0.8초 후에 error 카드 되돌림 처리
        setTimeout(() => {
          setSelectedCards([]);
          setErroredCards([]);
          setIsChecking(false);
        }, 800);
      }
    }
  }, [selectedCards]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  });

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

  return {
    setupGame,
    onCardClick,
    gameItems,
    selectedCards,
    matchedPairs,
    erroredCards,
    isGameStarted,
    isGameWon,
  };
}

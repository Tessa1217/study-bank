import { useParams } from "react-router-dom";
import { useMatchCard } from "@/hooks/useMatchCard";
import { useCardListQuery } from "@/hooks/queries/useCardQuery";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
import LoadingSpinner from "@/components/ui/loading";
import MatchGameCard from "@/components/studyroom/match-card";
import Button from "@/components/button/button";

export default function MatchCard() {
  const { setId } = useParams();
  const { data: cards, isLoading } = useCardListQuery(setId);
  const {
    setupGame,
    gameItems,
    selectedCards,
    matchedPairs,
    erroredCards,
    onCardClick,
    isGameWon,
    gameTime,
  } = useMatchCard(cards);

  if (isLoading) {
    return <LoadingSpinner fullScreen={true} />;
  }

  if (isGameWon) {
    return (
      <PageWrapper>
        <div className="flex flex-col items-center justify-center text-center gap-6 p-8 bg-white rounded-2xl shadow-soft">
          <h2 className="text-3xl font-bold text-yellow-500">축하합니다!</h2>
          <p className="text-lg text-slate-700">모든 카드를 맞추셨습니다!</p>
          <p className="text-lg">
            <strong>기록</strong>: {gameTime}초
          </p>
          <Button color="primary" size="lg" onClick={setupGame}>
            다시 시작하기
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <PageHeader
        title="카드 맞추기"
        subTitle="가능한 한 빨리 단어에 맞는 뜻을 가진 카드를 찾아주세요."
      >
        {gameTime}초
      </PageHeader>
      <div className="w-full max-w-5xl mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gameItems.map((item) => (
            <MatchGameCard
              key={item.id}
              text={item.text}
              onClick={() => onCardClick(item)}
              isErrored={erroredCards.some((errorId) => errorId === item.id)}
              isSelected={selectedCards.some((c) => c.id === item.id)}
              isMatched={matchedPairs.includes(item.pairId)}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

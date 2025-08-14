import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";
import { useSetWithCardsQuery } from "@/hooks/queries/useSetAndCardQuery";
import FlashCard from "@/components/studyroom/flashcard";
import Button from "@/components/button/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
const Learn = () => {
  const { setId } = useParams();
  const { data: studySet, isLoading } = useSetWithCardsQuery(setId);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!studySet) {
    return <div>No Study Set</div>;
  }

  const [activeCardIdx, setActiveCardIdx] = useState(0);
  const totalCardCnt = useMemo(() => studySet?.cards.length, [studySet]);
  const activeCard = useMemo(
    () => studySet?.cards[activeCardIdx],
    [activeCardIdx]
  );

  // const onNext = () => {

  // }

  // const onPrevious = () => {

  // }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">학습하기</h1>
      <div className="flex flex-col gap-4">
        <FlashCard card={activeCard} />
        <div className="flex gap-4 align-middle justify-center items-center">
          <Button color="purple">
            <ArrowLeft />
          </Button>
          <div>
            <span>{activeCardIdx + 1}</span>/<span>{totalCardCnt}</span>
          </div>
          <Button color="purple">
            <ArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Learn;

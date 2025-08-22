import { useParams } from "react-router-dom";
import { useCardListQuery } from "@/hooks/queries/useCardQuery";
import LearnFlashcard from "@/components/card/learn-flashcards";
const Learn = () => {
  const { setId } = useParams();
  const { data: cards, isLoading } = useCardListQuery(setId);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="page">
      <div className="page-content">
        <div className="page-header">
          <div className="page-title-container">
            <h2 className="page-title">학습하기</h2>
          </div>
        </div>
        {setId && cards?.length && (
          <LearnFlashcard cards={cards} setId={setId} />
        )}
      </div>
    </div>
  );
};

export default Learn;

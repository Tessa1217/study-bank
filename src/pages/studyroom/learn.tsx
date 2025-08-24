import { useParams } from "react-router-dom";
import { useCardListQuery } from "@/hooks/queries/useCardQuery";
import LearnFlashcard from "@/components/card/learn-flashcards";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
const Learn = () => {
  const { setId } = useParams();
  const { data: cards, isLoading } = useCardListQuery(setId);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <PageWrapper>
      <PageHeader
        title="학습하기"
        subTitle="나만의 학습 세트를 학습해보세요."
      />
      {setId && cards?.length && <LearnFlashcard cards={cards} setId={setId} />}
    </PageWrapper>
  );
};

export default Learn;

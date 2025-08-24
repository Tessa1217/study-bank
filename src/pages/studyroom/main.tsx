import { useParams, Navigate, Link } from "react-router-dom";
import { useSetWithCardsQuery } from "@/hooks/queries/useSetAndCardQuery";
import type { StudySetDetail } from "@/api/mapper/types";
import { Pencil } from "lucide-react";
import Button from "@/components/button/button";
import LearnFlashcard from "@/components/card/learn-flashcards";
import PageWrapper from "@/components/layout/page-wrapper";
import PageHeader from "@/components/layout/page-header";
const Main = () => {
  const { setId } = useParams();
  const { data: studySet, isLoading } = useSetWithCardsQuery(setId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!setId) {
    return <Navigate to="/library" />;
  }

  const { title, description, cards: cards } = studySet as StudySetDetail;

  return (
    <PageWrapper>
      <PageHeader title={title} subTitle={description ?? ""} />
      <section>
        <LearnFlashcard cards={cards} setId={setId} />
      </section>
      <section>
        <h3 className="text-xl font-bold mb-4">
          이 세트의 단어({cards.length})
        </h3>
        <div className="bg-secondary p-5 rounded-2xl">
          <div className="flex flex-col gap-4 w-full">
            {cards.map((card) => (
              <div
                key={card.id}
                className="card group flex flex-col md:flex-row justify-between gap-3 p-4 hover:shadow-md"
              >
                <p className="font-semibold md:basis-1/3">{card.word}</p>
                <div className="flex gap-4 items-start justify-start content-end md:basis-2/3">
                  <p>{card.definition}</p>
                  {/* <button>
                    <Pencil />
                  </button> */}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <Link to={`/set/${setId}/edit`}>
              <Button
                color="primary"
                className="flex flex-row justify-center gap-4"
              >
                <span>단어 추가/삭제</span>
                <Pencil />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default Main;

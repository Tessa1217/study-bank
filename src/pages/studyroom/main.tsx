import { useParams, Navigate } from "react-router-dom";
import { useSetWithCardsQuery } from "@/hooks/queries/useSetAndCardQuery";
import type { StudySetDetail } from "@/api/mapper/types";
import Learn from "@/pages/studyroom/learn";
import { Pencil } from "lucide-react";
const Main = () => {
  const { setId } = useParams();
  const { data: studySet, isLoading } = useSetWithCardsQuery(setId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!setId) {
    return <Navigate to="/library" />;
  }

  const { title, description, cards: cardList } = studySet as StudySetDetail;

  return (
    <div className="page">
      <h2 className="page-header">{title}</h2>
      <p>{description}</p>
      <section className="max-w-4xl">
        <Learn />
      </section>
      <section className="max-w-4xl">
        <h3 className="text-xl font-bold mb-4">
          이 세트의 단어({cardList.length + 1})
        </h3>
        <div className="bg-secondary p-5 rounded-2xl">
          <div className="flex flex-col gap-4 w-full">
            {cardList.map((card) => (
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
        </div>
      </section>
    </div>
  );
};

export default Main;

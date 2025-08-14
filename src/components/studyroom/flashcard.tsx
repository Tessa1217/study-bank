import type { StudyCardDraft } from "@/api/mapper/types";
import { useState } from "react";
const FlashCard = ({ card }: { card: StudyCardDraft }) => {
  const { word, definition } = card;
  const [flipped, setFlipped] = useState<boolean>(false);
  return (
    <div
      className="relative mx-auto aspect-[3/2] w-full max-w-xl [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative h-full w-full rounded-2xl border bg-white shadow-soft transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 grid place-items-center p-6 [backface-visibility:hidden]">
          <p className="text-lg text-center">{word}</p>
        </div>
        <div className="absolute inset-0 grid place-items-center p-6 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-slate-900 text-white rounded-2xl">
          <p className="text-lg text-center">{definition}</p>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;

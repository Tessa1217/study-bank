import StudyModeButton from "@/components/studyroom/study-mode-button";
import { Blocks, BookA, Shapes } from "lucide-react";
export default function StudyModeButtons({ setId }: { setId: string }) {
  return (
    <nav className="grid gap-[1rem] w-full grid-cols-2 lg:grid-cols-3">
      <StudyModeButton
        title="낱말카드"
        icon={<Shapes color="white" />}
        to={`/sets/${setId}/learn`}
      />
      <StudyModeButton
        title="학습하기"
        icon={<BookA color="white" />}
        to={`/sets/${setId}/learn`}
      />
      <StudyModeButton
        title="카드 맞추기"
        icon={<Blocks color="white" />}
        to={`/sets/${setId}/match`}
      />
    </nav>
  );
}

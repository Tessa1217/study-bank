import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect } from "react";
import type { StudyCardDraft } from "@/api/mapper/types";
import { useNavigate } from "react-router-dom";
import { useStudyFlow } from "@/hooks/useStudyFlow";
import { useStudyProgressAutosave } from "@/hooks/useStudyProgressAutoSave";
import { useAuthStore } from "@/store/useAuthStore";
import ProgressBar from "@/components/studyroom/progress-bar";
import FlashCard from "@/components/card/flashcard";
import Button from "@/components/button/button";
import FinishLearn from "@/components/studyroom/finish-learn";

const LearnFlashcard = ({
  cards,
  setId,
}: {
  cards: StudyCardDraft[];
  setId: string;
}) => {
  const navigate = useNavigate();

  const {
    idx,
    total,
    finished,
    activeCard,
    progress,
    next,
    previous,
    reset,
    stats,
  } = useStudyFlow<StudyCardDraft>(cards);

  const user_id = useAuthStore((state) => state.user?.id);

  const { flushNow } = useStudyProgressAutosave({
    beaconUrl: `${
      import.meta.env.VITE_APP_SUPABASE_URL
    }/functions/v1/study-progress-beacon`,
    getPayload: () => ({
      user_id: user_id!,
      set_id: setId!,
      completed_count: stats.completedCount,
      total_count: stats.totalCount,
      accuracy: 1,
      total_study_ms: 0,
      last_learned_at: new Date().toISOString(),
      streak_days: 0,
      updated_at: new Date().toISOString(),
      idempotency_key: `${setId}-${Date.now()}`,
    }),
    autosaveIntervalMs: 5_000,
  });

  // 학습을 종료했다면 강제로 flush
  useEffect(() => {
    if (finished) {
      flushNow();
    }
  }, [finished, flushNow]);

  if (finished) {
    return (
      <div className="page">
        <FinishLearn
          completed={stats.completedCount}
          total={stats.totalCount}
          onRestart={reset}
          onPractice={() => navigate("/")}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center align-middle gap-4 relative max-w-4xl">
      {activeCard && (
        <>
          <FlashCard card={activeCard} />
          <ProgressBar current={progress.current} end={progress.end} />
          <div className="flex gap-4 align-middle justify-center items-center">
            <Button color="primary" onClick={previous}>
              <ArrowLeft />
            </Button>
            <div>
              <span>{progress.current + 1}</span>
              <span>/</span>
              <span>{progress.end + 1}</span>
            </div>
            <Button color="primary" onClick={next}>
              <ArrowRight />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LearnFlashcard;

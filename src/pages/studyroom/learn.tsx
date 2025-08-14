import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useCardListQuery } from "@/hooks/queries/useCardQuery";
import FlashCard from "@/components/card/flashcard";
import Button from "@/components/button/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProgressBar from "@/components/studyroom/progress-bar";
import FinishLearn from "@/components/studyroom/finish-learn";
import type { StudyCardDraft } from "@/api/mapper/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useStudyFlow } from "@/hooks/useStudyFlow";
import { useStudyProgressAutosave } from "@/hooks/useStudyProgressAutoSave";
const Learn = () => {
  const { setId } = useParams();
  const { data: cardList, isLoading } = useCardListQuery(setId);
  const navigate = useNavigate();
  const user_id = useAuthStore((state) => state.user?.id);

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
  } = useStudyFlow<StudyCardDraft>(cardList);

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

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (finished) {
    return (
      <div className="space-y-6">
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">학습하기</h2>
      {activeCard && (
        <div className="flex flex-col gap-4 relative max-w-4xl">
          <FlashCard card={activeCard} />
          <ProgressBar current={progress.current} end={progress.end} />
          <div className="flex gap-4 align-middle justify-center items-center">
            <Button color="purple" onClick={previous}>
              <ArrowLeft />
            </Button>
            <div>
              <span>{progress.current + 1}</span>/
              <span>{progress.end + 1}</span>
            </div>
            <Button color="purple" onClick={next}>
              <ArrowRight />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learn;

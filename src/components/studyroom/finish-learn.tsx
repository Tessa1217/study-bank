import { useEffect } from "react";
import Button from "@/components/button/button";

type FinishProps = {
  completed: number;
  total: number;
  onRestart: () => void;
  onPractice: () => void;
};

const FinishLearn = ({
  completed,
  total,
  onRestart,
  onPractice,
}: FinishProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      onPractice();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onPractice]);

  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  return (
    <div className="flex items-center justify-between gap-8 p-6 rounded-2xl bg-white shadow">
      <div className="flex-1">
        <h2 className="page-header mb-4">좋아요! 모든 카드를 복습하셨어요.</h2>
        <div className="space-y-2">
          <div className="h-3 bg-emerald-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-400"
              style={{ width: `${percent}%` }}
            />
          </div>
          <div className="text-sm text-slate-600">
            완료 <b>{completed}</b> · 남은 단어{" "}
            <b>{Math.max(total - completed, 0)}</b>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-72">
        <Button color="blue" className="h-12" onClick={onPractice}>
          문제로 연습하기
        </Button>
        <Button variant="outline" className="h-12" onClick={onRestart}>
          낱말카드 재시작
        </Button>
        <div className="text-xs text-right text-slate-500">
          계속하려면 아무 키나 누르세요 →
        </div>
      </div>
    </div>
  );
};

export default FinishLearn;

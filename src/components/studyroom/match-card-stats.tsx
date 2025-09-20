import { ChartBar } from "lucide-react";
import { generateFeedback } from "@/utils/feedback";
import { useMatchCardSessionQuery } from "@/hooks/queries/useMatchCardSessionQuery";

type MatchCardStatsProps = {
  setId: string;
  userId: string;
};
function MatchCardStats({ setId, userId }: MatchCardStatsProps) {
  const {
    data: stats,
    isLoading,
    isError,
  } = useMatchCardSessionQuery(userId, setId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex gap-3">
          <ChartBar /> 카드 맞추기 요약
        </h3>
        <p className="text-slate-500">통계를 불러오는 중...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex gap-3">
          <ChartBar /> 카드 맞추기 요약
        </h3>
        <p className="text-red-500">통계를 불러오지 못했습니다.</p>
      </div>
    );
  }

  if (!stats || stats.totalSessions === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4 flex gap-3">
          <ChartBar /> 카드 맞추기 요약
        </h3>
        <p className="text-slate-500">
          아직 카드 맞추기 기록이 없으시군요? 카드 맞추기 게임을 통해
          학습해보세요!
        </p>
      </div>
    );
  }

  const feedbacks = generateFeedback(stats);

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 flex gap-3">
        <ChartBar /> 카드 맞추기 요약
      </h3>
      {/* 피드백 */}
      <div className="bg-slate-50 p-3 rounded-lg text-sm mb-4">
        {feedbacks.slice(0, 2).map((msg: string, i: number) => (
          <p key={i} className="mb-1">
            💡 {msg}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        {/* 총 세션 */}
        <div>
          <p className="text-slate-500">총 세션</p>
          <p className="font-bold">{stats.totalSessions ?? 0}회</p>
        </div>

        {/* 평균 시간 */}
        <div>
          <p className="text-slate-500">평균 시간</p>
          <p className="font-bold">{stats.avgTime ?? 0}초</p>
        </div>

        {/* 정답률 */}
        <div className="col-span-2">
          <p className="text-slate-500">정답률</p>
          <div className="flex items-center gap-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${stats.accuracy ?? 0}%` }}
              />
            </div>
            <span className="font-bold">{stats.accuracy ?? 0}%</span>
          </div>
        </div>

        {/* 효율 */}
        <div>
          <p className="text-slate-500">효율</p>
          <p className="font-bold">
            {stats.efficiency ? `${stats.efficiency}개/초` : "-"}
          </p>
        </div>

        {/* 총 시도 */}
        <div>
          <p className="text-slate-500">총 시도</p>
          <p className="font-bold">{stats.totalAttempts ?? 0}회</p>
        </div>
      </div>
    </div>
  );
}

export default MatchCardStats;

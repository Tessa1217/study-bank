import type { StudyMatchGameStats } from "@/api/mapper/types";
export const generateFeedback = (stats: StudyMatchGameStats): string[] => {
  const messages: string[] = [];

  // 1. 정확도 관련
  if (stats.accuracy === 100) {
    messages.push(
      `🎯 ${stats.totalAttempts}번 시도 중 ${stats.totalCorrect}개를 모두 맞췄습니다. 정확도가 매우 뛰어납니다.`
    );
  } else if (stats.accuracy >= 80) {
    messages.push(
      `✅ 정답률은 ${stats.accuracy}%로 높은 편입니다. 틀린 문제는 ${stats.totalWrong}개입니다.`
    );
  } else {
    messages.push(
      `⚠️ 정답률은 ${stats.accuracy}%에 머물렀습니다. 자주 틀린 카드 복습이 필요합니다.`
    );
  }

  // 2. 속도 관련
  if (stats.timeDiffPercent > 0) {
    messages.push(
      `⏱️ 첫 세션(${stats.firstTime}초)보다 마지막 세션(${stats.lastTime}초)이 ${stats.timeDiffPercent}% 빨라졌습니다.`
    );
  } else if (stats.timeDiffPercent < 0) {
    messages.push(
      `🐢 첫 세션(${stats.firstTime}초) 대비 마지막 세션(${
        stats.lastTime
      }초)은 ${Math.abs(stats.timeDiffPercent)}% 느려졌습니다.`
    );
  } else {
    messages.push(`⚖️ 첫 세션과 마지막 세션의 소요 시간이 비슷합니다.`);
  }

  // 3. 직전 대비 개선율
  if (stats.improvementPercent !== null) {
    if (stats.improvementPercent > 0) {
      messages.push(
        `📈 직전 세션 대비 ${stats.improvementPercent}% 빨라졌습니다.`
      );
    } else if (stats.improvementPercent < 0) {
      messages.push(
        `📉 직전 세션 대비 ${Math.abs(stats.improvementPercent)}% 느려졌습니다.`
      );
    }
  }

  // 4. 효율 관련
  messages.push(
    `⚡ 평균 ${stats.efficiency}개/초의 속도로 카드를 맞추고 있습니다. 목표는 0.5개/초 이상을 달성하는 것입니다.`
  );

  // 5. 세션 반복
  if (stats.totalSessions > 1) {
    messages.push(`🔄 총 ${stats.totalSessions}회 반복 학습을 진행했습니다.`);
  } else {
    messages.push(
      `🆕 첫 세션을 완료했습니다. 반복 학습을 통해 더 빠른 개선이 기대됩니다.`
    );
  }

  return messages;
};

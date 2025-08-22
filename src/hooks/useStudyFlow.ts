import { useCallback, useMemo, useState } from "react";

export type Progress = {
  current: number;
  end : number;
}

export function useStudyFlow<T>(cards:T[] | undefined) {
  // 총 카드 개수
  const total = cards?.length ?? 0
  // 현재 학습 중인 카드의 인덱스
  const [idx, setIdx] = useState<number>(0)
  // 학습종료 여부
  const [finished, setFinished] = useState<boolean>(false)

  const hasCards = total > 0

  // 다음 카드로 가기
  const next = useCallback(() => {
    if (!hasCards) return;
    if (idx + 1 >= total) {
      setFinished(true);
      return;
    } 
    setIdx((i) => i + 1)
  }, [idx, total, hasCards])

  // 이전 카드로 가기
  const previous = useCallback(() => {
    if (!hasCards) return;
    setIdx((i) => (i - 1 < 0 ? 0 : i - 1))
  }, [total, hasCards])

  // 초기화
  const reset = useCallback(() => {
    setIdx(0)
    setFinished(false)
  }, [])

  // 현재 활성화된 카드
  const activeCard = useMemo(() => (hasCards? cards![idx] : undefined), [idx, cards, hasCards])

  // 진행 상태 - progress bar
  const progress : Progress = useMemo(() => ({current: idx, end : Math.max(total - 1, 0)}), [idx, total])

  const stats = useMemo(() => ({
    completedCount : finished ? total : Math.min(idx, total),
    totalCount: total
  }), [finished, idx, total])

  return { idx, total, finished, activeCard, progress, next, previous, reset, stats}
}
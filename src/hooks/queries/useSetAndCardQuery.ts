import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { setWithCardsKeys, setsKeys } from "@/hooks/queries/keys";
import { callEdge } from "@/api/shared/edge";
import { toSetDTO, toCardsDTO, toSetDetail } from "@/api/mapper/mapper";
import type { StudyCardDraft, StudySetDraft } from "@/api/mapper/types";
import { getStudySetById } from "@/api/sets.api";

/** 상세(세트 + 카드들) 조회 */
export function useSetWithCardsQuery(id: string | undefined) {
  return useQuery({
    queryKey: id ? setWithCardsKeys.detail(id) : setWithCardsKeys.detail(""),
    enabled: !!id,
    queryFn: async () => {
      if (!id) throw new Error("Missing set id");
      const res = await getStudySetById(id);
      if (res.error) throw res.error;
      return res.data!;
    },
    select: (row) => (row ? toSetDetail(row as any) : undefined),
  });
}

/** 저장(Edge Function) */
export function useSaveSetWithCardsMutation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: {
      set: StudySetDraft;
      cards: StudyCardDraft[];
    }) => {
      const dto = {
        set: toSetDTO(payload.set),
        cards: toCardsDTO(payload.cards),
      };
      return callEdge<{ data: { set: any; cards: any[] } }>(
        "save-set-and-cards",
        dto
      );
    },
    onSuccess: (result) => {
      console.log("global");
      console.log(result);
      const set = result?.data?.set;
      const id = set?.id as string | undefined;
      // 상세 캐시 업데이트
      if (id) {
        qc.setQueryData(
          setWithCardsKeys.detail(id),
          toSetDetail({ ...set, study_card: result?.data.cards } as any)
        );
        qc.invalidateQueries({ queryKey: setWithCardsKeys.detail(id) });
      } else {
        qc.invalidateQueries({ queryKey: setsKeys.list() });
      }
    },
  });
}

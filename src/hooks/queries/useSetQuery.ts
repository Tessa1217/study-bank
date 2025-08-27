import { useQuery } from "@tanstack/react-query";
import { setsKeys } from "@/hooks/queries/keys";
import { getStudySets } from "@/api/sets.api";
import { toSetSummary } from "@/api/mapper/mapper";

/** 리스트 쿼리 */
export function useSetListQuery() {
  return useQuery({
    queryKey: setsKeys.list(),
    queryFn: async () => {
      const res = await getStudySets();
      if (res.error) throw res.error;
      return res.data ?? [];
    },
    select: (rows) => rows.map(toSetSummary),
  });
}

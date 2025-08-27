import { useQuery } from "@tanstack/react-query";
import { setsKeys } from "@/hooks/queries/keys";
import {
  getStudySets,
  getStudySetsPublicOrCreatedByUser,
} from "@/api/sets.api";
import { toSetItem, toSetSummary } from "@/api/mapper/mapper";

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

export function useSetListPublicOrCreatedByUserQuery(
  userId: string | undefined
) {
  return useQuery({
    queryKey: userId
      ? setsKeys.listPublicOrCreatedByUser(userId)
      : setsKeys.listPublicOrCreatedByUser(""),
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) throw new Error("Missing user id");
      const res = await getStudySetsPublicOrCreatedByUser(userId);
      if (res.error) throw res.error;
      return res.data!;
    },
    select: (rows) => rows?.map(toSetItem),
  });
}

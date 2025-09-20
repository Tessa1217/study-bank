import { useQuery } from "@tanstack/react-query";
import { getStudyMatchGameSession } from "@/api/study-match-game-session.api";
import { matchCardSessionKeys } from "@/hooks/queries/keys";
import type { Json } from "@/types/supabase.types";
import { toMatchCardGameStats } from "@/api/mapper/mapper";

export function useMatchCardSessionQuery(userId: string, setId: string) {
  return useQuery({
    queryKey: matchCardSessionKeys.stats(userId, setId),
    enabled: !!userId && !!setId,
    queryFn: async () => {
      if (!userId || !setId) return {};
      const res = await getStudyMatchGameSession(setId, userId);
      if (res.error) throw res.error;
      return res.data ?? {};
    },
    select: (row: Json) => toMatchCardGameStats(row),
  });
}

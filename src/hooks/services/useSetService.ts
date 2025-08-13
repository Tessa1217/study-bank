import { useServiceHandler } from "@/hooks/services/useServiceHandler";
import { useAuthStore } from "@/store/useAuthStore";
import { getStudySet as rawGetStudySet, upsertStudySet as rawInsertStudySet } from "@/api/sets.api";

export function useSetService() {
  const { bind } = useServiceHandler()
  const uid = useAuthStore((state) => state.user?.id)

  const insertStudySet = bind((payload) => rawInsertStudySet({...payload.set, user_id : uid}))

  return { insertStudySet}
}
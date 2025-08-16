import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "@/api/profile.api";
import { profileKeys } from "@/hooks/queries/keys";
import { toUserProfile } from "@/api/mapper/mapper";

/** 사용자 프로파일 조회 */
export const useProfileQuery = (userId : string | undefined) => {
  return useQuery({
    queryKey: userId ? profileKeys.detail(userId) : profileKeys.detail(''),
    enabled: !!userId,
    queryFn: async () => {
      if (!userId) throw new Error("There is no profile user id")
      const { data } = await getUserProfile(userId)
      return data
    },
    select: (row) => row ? toUserProfile(row) : undefined
  })
}
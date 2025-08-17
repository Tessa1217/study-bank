import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile } from "@/api/profile.api";
import { profileKeys } from "@/hooks/queries/keys";
import { toUserProfile, toUserProfileDTO } from "@/api/mapper/mapper";
import type { UserProfile } from "@/api/mapper/types";

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

export const useProfileMutation = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (userProfile : UserProfile) => {
      const dto = toUserProfileDTO(userProfile)
      const { data } = await updateUserProfile(dto)
      return data as UserProfile
    },
    onMutate: async (input) => {
      const key = profileKeys.detail(input.id);
      await qc.cancelQueries({ queryKey: key });

      const previous = qc.getQueryData<UserProfile>(key);
      qc.setQueryData<UserProfile>(key, (old) => ({ ...(old ?? {} as any), ...input }));

      return { previous, key };
    },
    onError: (_err, _input, ctx) => {
      if (ctx?.previous && ctx.key) qc.setQueryData(ctx.key, ctx.previous);
    },
    onSuccess: (data, _input, ctx) => {
      if (ctx?.key && data) qc.setQueryData(ctx.key, data);
    },
    onSettled: (_data, _err, input) => {
      if (input?.id) qc.invalidateQueries({ queryKey: profileKeys.detail(input.id) });
    },
  })
}
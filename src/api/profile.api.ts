import {
  pickDefined,
  sbExecOne,
  supabase,
  type SbResult,
} from "@/api/shared/sb-api";
import type { Row, Update } from "@/api/shared/types";

export type ProfilesRow = Row<"user_profiles">;
export type ProfilesUpdate = Update<"user_profiles">;

const PROFILE_COLUMNS =
  "id, avatar_url, user_name, interests, languages, created_at, updated_at";

/** RLS 전제: 현재 로그인 사용자 */
export async function getUserProfile(userId : string): SbResult<Partial<ProfilesRow>> {
  return sbExecOne<Partial<ProfilesRow>>(
    supabase.from("user_profiles").select(PROFILE_COLUMNS).eq('id', userId).single()
  );
}

/** 사용자 수정 */
export async function updateUserProfile(
  payload: ProfilesUpdate
): SbResult<Partial<ProfilesRow>> {
  const updatePayload = pickDefined(payload);
  return sbExecOne<Partial<ProfilesRow>>(
    supabase
      .from("user_profiles")
      .update(updatePayload)
      .select(PROFILE_COLUMNS)
      .single()
  );
}

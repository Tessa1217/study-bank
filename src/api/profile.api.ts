import {
  pickDefined,
  sbExecOne,
  supabase,
  type SbResult,
} from "@/api/shared/sb-api";
import type { Row, Update } from "@/api/shared/types";

type ProfilesRow = Row<"user_profiles">;
type ProfilesUpdate = Update<"user_profiles">;

export type UserProfile = Pick<
  ProfilesRow,
  | "id"
  | "avatar_url"
  | "user_name"
  | "interests"
  | "languages"
  | "updated_at"
  | "created_at"
>;

const PROFILE_COLUMNS =
  "id, avatar_url, user_name, interests, languages, created_at, updated_at";

/** RLS 전제: 현재 로그인 사용자 */
export async function getUserProfile(): SbResult<UserProfile> {
  return sbExecOne<UserProfile>(
    supabase.from("user_profiles").select(PROFILE_COLUMNS).single()
  );
}

export async function updateUserProfile(
  payload: ProfilesUpdate
): SbResult<UserProfile> {
  const updatePayload = pickDefined(payload);
  return sbExecOne<UserProfile>(
    supabase
      .from("user_profiles")
      .update(updatePayload)
      .select(PROFILE_COLUMNS)
      .single()
  );
}

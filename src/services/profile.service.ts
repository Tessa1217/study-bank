import { supabase } from "@/lib/supabase";
import type { Database, Tables } from "@/types/supabase.types";

type ProfilesRow = Tables<"user_profiles">;
type ProfilesUpdate = Database["public"]["Tables"]["user_profiles"]["Update"];
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

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const profileBuilder = supabase.from("user_profiles").select("*").single();

  const { data, error } = await profileBuilder;

  if (error) throw error;
  return data as UserProfile;
}

export async function updateUserProfile(
  payload: ProfilesUpdate
): Promise<UserProfile> {
  const updatePayload = { ...payload, updated_at: new Date().toISOString() };
  const updateProfileBuilder = supabase
    .from("user_profiles")
    .update(updatePayload)
    .select("id, avatar_url, user_name, interests, languages")
    .single();

  const { data, error } = await updateProfileBuilder;

  if (error) throw error;

  return data as UserProfile;
}

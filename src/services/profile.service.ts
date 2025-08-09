import { supabase } from "@/lib/supabase";

export async function getUserProfile(userId: string) {
  const profileBuilder = supabase.from("user_profiles").select("*").single();

  const { data, error } = await profileBuilder;

  if (error) throw error;
  return data;
}

export async function updateProfile(userId: string) {
  // const updateProfileBuilder = supabase.from("profile").update({ avatar_url : })
}

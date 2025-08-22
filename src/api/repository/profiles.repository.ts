import {
  sbExecOne,
  supabase,
  type SbResult,
} from "@/api/shared/sb-api";
import type { Row, Update } from "@/api/shared/types";

export type ProfilesRow = Row<"user_profiles">;
export type ProfilesUpdate = Update<"user_profiles">;

const PROFILE_COLUMNS = "id, avatar_url, user_name, interests, languages"

export const userProfilesRepository = {
  findById : (id:string) : SbResult<Partial<ProfilesRow>> => {
    const builder = supabase.from("user_profiles").select(PROFILE_COLUMNS).eq("id", id).single()
    return sbExecOne(builder)
  },
  update : (payload:ProfilesUpdate) : SbResult<Partial<ProfilesRow>> => {    
    const builder = supabase
      .from("user_profiles")
      .update(payload)
      .eq("id", payload.id!)
      .select(PROFILE_COLUMNS)      
      .single()
    return sbExecOne(builder)
  }
}

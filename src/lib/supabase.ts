import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase.types";
const SUPABASE_URL = import.meta.env.VITE_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_APP_SUPABASE_ANON_KEY;
export const supabase: SupabaseClient<Database> = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

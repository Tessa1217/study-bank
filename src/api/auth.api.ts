import { supabase } from "@/lib/supabase";

export type Credentials = {
  email: string;
  password: string;
}

export type Profile = {
  avatar_url: string;
  user_name: string;
  interests: string[];
  languages: string[];
}

export type Provider = "github" | "google"

export async function signInWithPassword(credentials:Credentials) {
  return await supabase.auth.signInWithPassword(credentials)  
}

export async function signInOAuth(provider:Provider) {
  return await supabase.auth.signInWithOAuth({provider, options: {
    redirectTo : "/"
  }})
}

export async function signUp(credentials:Credentials) {
  return await supabase.auth.signUp({
    ...credentials,
    options: { emailRedirectTo : `${import.meta.env.VITE_APP_URL}` }    
  })
}

export async function signOut() {
  return await supabase.auth.signOut()
}
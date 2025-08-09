import { supabase } from "@/lib/supabase";

export type Credentials = {
  email: string;
  password: string;
};

export type Provider = "github" | "google";

// 일반 로그인 시
export async function signInWithPassword(credentials: Credentials) {
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    console.error("Login failed:", error.message);
    return;
  }

  return true;
}

// OAuth 로그인 시
export async function signInOAuth(provider: Provider) {
  const { error } = await supabase.auth.signInWithOAuth({ provider });

  if (error) {
    console.error("Login failed:", error.message);
    return;
  }

  return true;
}

export async function signUp(credentials: Credentials) {
  const { error } = await supabase.auth.signUp({
    ...credentials,
    options: { emailRedirectTo: `${import.meta.env.VITE_APP_URL}/auth/login` },
  });

  if (error) {
    console.error("[SignUp Error]", error);
    throw new Error("회원가입에 실패했습니다.");
  }
  return true;
}

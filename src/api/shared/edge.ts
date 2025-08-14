import { supabase } from "@/lib/supabase";
export async function callEdge<T>(path: string, payload: unknown): Promise<T> {
  const { data: { session } } = await supabase.auth.getSession()
  const res = await fetch(`${import.meta.env.VITE_APP_SUPABASE_URL}/functions/v1/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Edge function error (${res.status})`);
  }
  return res.json() as Promise<T>;
}

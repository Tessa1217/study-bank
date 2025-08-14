import { supabase } from "@/lib/supabase";
export async function callEdge<T>(path: string, payload: unknown, opts?: {keepalive?: boolean}): Promise<T | undefined> {
  const { data: { session } } = await supabase.auth.getSession()
  const res = await fetch(`${import.meta.env.VITE_APP_SUPABASE_URL}/functions/v1/${path}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
    },
    keepalive: !!opts?.keepalive,
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Edge function error (${res.status})`);
  }
  return res.status === 204 ? undefined : res.json() as Promise<T>;
}

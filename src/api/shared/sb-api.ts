import { supabase } from "@/lib/supabase";
import type { PostgrestBuilder } from "@supabase/postgrest-js";
import { mapSupabaseError } from "@/api/error/error-handler";
import type { AppError } from "@/api/error/error.types";

/** 빌더 타입 */
type Builder<T> = PostgrestBuilder<T, any>;

/** Supabase 리턴 타입 */
export type SbResult<T> = Promise<{ data: T | null; error: AppError | null }>;

/** select() 다건 */
export async function sbExecMany<T>(builder: Builder<T[]>): SbResult<T[]> {
  try {
    const { data, error } = (await builder) as { data: T[]; error: unknown };
    if (error) throw error;
    return { data, error: null };
  } catch (e) {
    return { data: null, error: mapSupabaseError(e) };
  }
}

/** single() 단건 */
export async function sbExecOne<T>(builder: Builder<T>): SbResult<T> {
  try {
    const { data, error } = (await builder) as { data: T; error: unknown };
    if (error) throw error;
    return { data, error: null };
  } catch (e) {
    return { data: null, error: mapSupabaseError(e) };
  }
}

/** maybeSingle() 단건 or null
 *  - 어떤 환경에선 타입이 T | null 대신 T[] | null로 추론되기도 해서 둘 다 수용
 *  - 런타임에서도 배열이면 첫 요소를 반환 (없으면 null)
 */
export function sbExecMaybe<T>(builder: Builder<T | null>): SbResult<T | null>;
export function sbExecMaybe<T>(
  builder: Builder<T[] | null>
): SbResult<T | null>;
export async function sbExecMaybe<T>(
  builder: Builder<any>
): SbResult<T | null> {
  try {
    const { data, error } = (await builder) as {
      data: T | T[] | null;
      error: unknown;
    };
    if (error) throw error;
    if (Array.isArray(data)) {
      return { data: (data[0] ?? null) as T | null, error: null };
    }

    return { data: (data ?? null) as T | null, error: null };
  } catch (e) {
    return { data: null, error: mapSupabaseError(e) };
  }
}

/** payload에 대한 undefined 제거(부분 업데이트용): null은 유지 */
export const pickDefined = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;

export { supabase };

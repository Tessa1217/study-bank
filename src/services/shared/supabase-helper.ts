import { supabase } from "@/lib/supabase";
import type { PostgrestBuilder } from "@supabase/postgrest-js";

/** 런타임 에러 → AppError로 일원화 */
export function toAppError(e: unknown) {
  if (e && typeof e === "object") {
    const anyErr = e as any;
    const msg = anyErr?.message ?? "Unknown error";
    const code = anyErr?.code;
    const status = anyErr?.status ?? anyErr?.statusCode;
    // return new AppError(msg);
  }
  // return new AppError("Unknown error");
}

// 빌더 제네릭 2번째 파라미터는 버전에 따라 달라서 any로 둡니다.
type Builder<T> = PostgrestBuilder<T, any>;

/** select() 다건 */
export async function sbExecMany<T>(builder: Builder<T[]>): Promise<T[]> {
  try {
    const { data, error } = (await builder) as { data: T[]; error: unknown };
    if (error) throw error;
    return data;
  } catch (e) {
    throw toAppError(e);
  }
}

/** single() 단건 */
export async function sbExecOne<T>(builder: Builder<T>): Promise<T> {
  try {
    const { data, error } = (await builder) as { data: T; error: unknown };
    if (error) throw error;
    return data;
  } catch (e) {
    throw toAppError(e);
  }
}

/** maybeSingle() 단건 or null
 *  - 어떤 환경에선 타입이 T | null 대신 T[] | null로 추론되기도 해서 둘 다 수용
 *  - 런타임에서도 배열이면 첫 요소를 반환 (없으면 null)
 */
export function sbExecMaybe<T>(builder: Builder<T | null>): Promise<T | null>;
export function sbExecMaybe<T>(builder: Builder<T[] | null>): Promise<T | null>;
export async function sbExecMaybe<T>(builder: Builder<any>): Promise<T | null> {
  try {
    const { data, error } = (await builder) as {
      data: T | T[] | null;
      error: unknown;
    };
    if (error) throw error;
    if (Array.isArray(data)) return (data[0] ?? null) as T | null;
    return (data ?? null) as T | null;
  } catch (e) {
    throw toAppError(e);
  }
}

/** undefined 제거(부분 업데이트용). null은 유지 */
export const pickDefined = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;

export { supabase };

/** sb 타입을 프로젝트에 맞는 타입으로 조정 */
export function mapSb<T, U>(res: { data?: T; error?: any }, mapper: (x: T) => U) {
  if (res.error) return { data: undefined, error: res.error } as const;  
  return { data: mapper(res.data as T), error: null } as const;
}
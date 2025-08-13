import { useState, useCallback, useMemo } from "react"

export type Status = "idle" | "loading" | "success" | "empty" | "idle"

export type StatusState<T, E = unknown> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "empty" }
  | { status: "success"; data: T }
  | { status: "error"; error: E };

export function useStatusState<T, E = unknown>(initial?: Partial<T>) {
  const [state, setState] = useState<StatusState<T, E>>(
    initial ? { status: "success", data: initial as T } : { status: "idle" }
  );

  // 전이 helper들
  const setIdle = useCallback(() => setState({ status: "idle" }), []);
  const setLoading = useCallback(() => setState({ status: "loading" }), []);
  const setEmpty = useCallback(() => setState({ status: "empty" }), []);
  const setSuccess = useCallback((data: T) => setState({ status: "success", data }), []);
  const setError = useCallback((error: E) => setState({ status: "error", error }), []);

  // 편의 boolean
  const flags = useMemo(
    () => ({
      isIdle: state.status === "idle",
      isLoading: state.status === "loading",
      isEmpty: state.status === "empty",
      isSuccess: state.status === "success",
      isError: state.status === "error",
    }),
    [state.status]
  );

  return {
    state,
    setState,    
    setIdle,
    setLoading,
    setEmpty,
    setSuccess,
    setError,
    ...flags,
  } as const;
}
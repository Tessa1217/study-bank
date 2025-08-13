import { useError } from "@/hooks/useError";
import { type SbResult } from "@/api/shared/sb-api";

export function useServiceHandler() {
  const { notify, handle } = useError();

  function bind<TArgs extends any[], TData>(
    fn: (...args: TArgs) => SbResult<TData>,
    opts?: { onSuccess?: (d: TData) => void; successMessage?: string }
  ) {
    return async (...args: TArgs): Promise<TData | null> => {
      const data = await handle<TData>(fn(...args));
      if (data) {
        if (opts?.successMessage) {
        }
        opts?.onSuccess?.(data);
      }
      return data;
    };
  }
  return { bind, notify };
}

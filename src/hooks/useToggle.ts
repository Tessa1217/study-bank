import { useCallback, useState } from "react";
export function useToggle(initialState = false) {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return { state, toggle };
}

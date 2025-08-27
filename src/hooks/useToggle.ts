import { useCallback, useState } from "react";

type UseToggleReturnType = [boolean, (v?: boolean) => void];

export function useToggle(initialState = false): UseToggleReturnType {
  const [state, setState] = useState<boolean>(initialState);
  const toggle = useCallback(() => setState((state) => !state), []);
  return [state, toggle];
}

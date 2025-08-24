import { useEffect, useRef, type RefObject } from "react";
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  callback: () => void
) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const documentClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      savedCallback.current();
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", documentClick);
    return () => document.removeEventListener("mousedown", documentClick);
  }, []);
}

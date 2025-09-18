import { useMutation } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

type IntervalMutationOptions<T> = {
  payload: T;
  mutationFn: (payload: T) => Promise<unknown>;
  onSuccess?: (data: unknown) => void;
  interval: number;
  enabled: boolean;
  isFinal?: boolean;
};

export function useIntervalMutation<T>({
  payload,
  mutationFn,
  onSuccess,
  interval = 5000,
  enabled = false,
  isFinal = false,
}: IntervalMutationOptions<T>) {
  const payloadRef = useRef(payload);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    payloadRef.current = payload;
  }, [payload]);

  const { mutate } = useMutation({
    mutationFn,
    onSuccess,
  });

  useEffect(() => {
    if (!enabled) return;
    intervalRef.current = setInterval(() => {
      mutate(payloadRef.current);
    }, interval);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [mutate, interval, enabled]);

  useEffect(() => {
    if (isFinal) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // final mutation call
      mutate(payloadRef.current);
    }
  }, [isFinal, mutate]);
}

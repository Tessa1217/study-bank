import { useEffect, useRef, useMemo } from "react";

type ProgressBarProps = {
  current: number;
  end: number;
  label?: string;
};

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const ProgressBar = ({ current, end, label }: ProgressBarProps) => {
  const ratio = useMemo(
    () => (end > 0 ? clamp(current / end) : 0),
    [current, end]
  );

  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current || end == 0) {
      return;
    }
    progressRef.current.style.transform = `scaleX(${ratio})`;
  }, [ratio, end]);
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={end || 0}
      aria-valuenow={Math.round(ratio * (end || 0))}
      className="w-full bg-gray-200 rounded-full h-4 overflow-hidden"
    >
      <div
        ref={progressRef}
        className="w-full h-full bg-primary rounded-full origin-left will-change-transform duration-75"
        style={{ transform: "scaleX(0)" }}
      ></div>
    </div>
  );
};

export default ProgressBar;

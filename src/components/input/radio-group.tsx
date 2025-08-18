import { createContext, useContext, useId, useMemo } from "react";
import type React from "react";

type Ctx = {
  name: string;
  value?: string;
  onChange?: (next: string) => void;
  disabled?: boolean;
};
const RadioCtx = createContext<Ctx | null>(null);
const useRadioCtx = () => useContext(RadioCtx);

export interface RadioGroupProps {
  name?: string;
  value?: string; // controlled
  defaultValue?: string; // uncontrolled — 자식 개별 관리 시 생략 가능
  onChange?: (v: string) => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function RadioGroup({
  name,
  value,
  onChange,
  disabled,
  children,
  className,
}: RadioGroupProps) {
  const autoName = useId();
  const ctx = useMemo<Ctx>(
    () => ({
      name: name || `rg-${autoName}`,
      value,
      onChange,
      disabled,
    }),
    [name, autoName, value, onChange, disabled]
  );

  return (
    <RadioCtx.Provider value={ctx}>
      <div role="radiogroup" className={className}>
        {children}
      </div>
    </RadioCtx.Provider>
  );
}

/** Group과 함께 쓸 때 편한 프록시 */
export function RadioOption({
  value,
  children,
  disabled,
  className,
}: {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}) {
  const ctx = useRadioCtx();
  if (!ctx) throw new Error("RadioOption must be used inside <RadioGroup/>");

  const checked = ctx.value === value;

  return (
    <label
      className={[
        "flex items-center gap-2 cursor-pointer select-none",
        className,
      ].join(" ")}
    >
      <input
        type="radio"
        name={ctx.name}
        value={value}
        checked={checked}
        onChange={(e) => ctx.onChange?.(e.target.value)}
        disabled={disabled ?? ctx.disabled}
        style={{ accentColor: "var(--color-primary)" }}
        className="radio"
      />
      <span>{children}</span>
    </label>
  );
}

import { SetSchema } from "@/validation/schema";
import type { CardState } from "@/components/set/state/card.types";

export type FieldErrors = Record<string, string[]>
export type ErrorsByCardId = Record<string, FieldErrors>
export type SetErrors = {set?: FieldErrors, cards: ErrorsByCardId}

export function validateSet(input: {
  title: string;
  description?: string;
  cards: CardState["cards"];
}):SetErrors {
  const out: SetErrors = {set: {}, cards: {}}
  const res = SetSchema.safeParse(input)

  if (res.success) {
    return out
  }

  for (const issue of res.error.issues) {
    const [section, idx, field] = issue.path as (string|number)[];
    if (section === "cards" && typeof idx === "number" && typeof field === "string") {
      const id:string = input.cards[idx]?.id ?? `idx:${idx}`;
      (out.cards[id] ??= {});
      (out.cards[id][field] ??= []).push(issue.message);
    } else if (typeof section === "string") {
      (out.set ??= {});
      (out.set[section] ??= []).push(issue.message);
    } else {
      (out.set ??= {});
      (out.set._ ??= []).push(issue.message);
    }
  }

  return out;
}

export function hasErrors(e:SetErrors) {
  const setErr = e.set && Object.keys(e.set).length > 0;
  const cardErr = Object.keys(e.cards).some(id => Object.keys(e.cards[id]).length > 0);
  return setErr || cardErr;
}
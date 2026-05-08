import type { IEntry } from "../modules/transactions/types.js";

export function calculateBalance(
  entries: IEntry[],
  direction?: "debit" | "credit",
): number {
  return entries
    .values()
    .map((entry) => {
      return entry.direction === (direction ?? "debit")
        ? entry.amount
        : -entry.amount;
    })
    .reduce((sum, amount) => sum + amount, 0);
}

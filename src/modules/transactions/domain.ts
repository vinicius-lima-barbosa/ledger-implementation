import { calculateBalance } from "../../shared/calculate-balance.js";
import type { IEntry } from "./types.js";

export class Transaction {
  constructor(
    readonly id: string,
    readonly name: string | null,
    readonly entries: IEntry[],
  ) {
    if (entries.length === 0) {
      throw new Error("A transaction must have at least one entry.");
    }

    if (!this.isBalanced()) {
      throw new Error("The transaction entries must be balanced.");
    }
  }

  private isBalanced(): boolean {
    const balancedSum = calculateBalance(this.entries, "debit");

    return balancedSum === 0;
  }
}

import type { IEntry, ITransaction, ITransactionWithEntries } from "./types.js";

export function toTransactionWithEntries(
  transaction: ITransaction,
  entries: IEntry[],
): ITransactionWithEntries {
  return {
    ...transaction,
    entries,
  };
}

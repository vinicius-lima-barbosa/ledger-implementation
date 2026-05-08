import { Transaction } from "./domain.js";
import type { TCreateTransaction } from "./dto.js";
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

export function toTransaction(transaction: TCreateTransaction): Transaction {
  const id = transaction.id ? transaction.id : crypto.randomUUID();

  const entries = transaction.entries.map((entry) => ({
    id: crypto.randomUUID(),
    accountId: entry.accountId,
    amount: entry.amount,
    direction: entry.direction,
  }));

  return new Transaction(id, transaction.name ?? null, entries);
}

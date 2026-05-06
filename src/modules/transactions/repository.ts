import type { SQLiteDatabase } from "../../infra/sqlite-db.js";
import { withTransaction } from "../../shared/transaction.js";
import type { IEntry, ITransaction } from "./types.js";

interface ITransactionsRepository {
  createTransaction(data: ITransaction): Promise<ITransaction>;
  saveEntries(transactionId: string, entries: IEntry[]): Promise<IEntry[]>;
}

export class TransactionsRepository implements ITransactionsRepository {
  constructor(private db: SQLiteDatabase) {}

  async createTransaction(data: ITransaction): Promise<ITransaction> {
    const stmt = this.db.connection.prepare(
      "INSERT INTO transactions (id, name) VALUES (?, ?)",
    );

    stmt.run(data.id, data.name);

    return {
      id: data.id,
      name: data.name as string | null,
    };
  }

  async saveEntries(
    transactionId: string,
    entries: IEntry[],
  ): Promise<IEntry[]> {
    const stmt = this.db.connection.prepare(
      "INSERT INTO entries (id, transaction_id, account_id, amount, direction) VALUES (?, ?, ?, ?, ?)",
    );

    return withTransaction(this.db.connection, () => {
      for (const entry of entries) {
        stmt.run(
          entry.id,
          transactionId,
          entry.accountId,
          entry.amount,
          entry.direction,
        );
      }

      return entries;
    });
  }
}

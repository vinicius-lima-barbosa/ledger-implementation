import type { SQLiteDatabase } from "../../infra/sqlite-db.js";
import { withTransaction } from "../../shared/transaction.js";
import type { Transaction } from "./domain.js";

interface ITransactionsRepository {
  create(data: Transaction): Promise<void>;
}

export class TransactionsRepository implements ITransactionsRepository {
  constructor(private db: SQLiteDatabase) {}

  async create(transaction: Transaction): Promise<void> {
    const stmt = this.db.connection.prepare(
      "INSERT INTO transactions (id, name) VALUES (?, ?)",
    );

    stmt.run(transaction.id, transaction.name);

    const deleteEntriesStmt = this.db.connection.prepare(
      "DELETE FROM entries WHERE transaction_id = ?",
    );

    deleteEntriesStmt.run(transaction.id);

    const insertEntryStmt = this.db.connection.prepare(
      "INSERT INTO entries (id, transaction_id, account_id, amount, direction) VALUES (?, ?, ?, ?, ?)",
    );

    withTransaction(this.db.connection, () => {
      for (const entry of transaction.entries) {
        insertEntryStmt.run(
          entry.id,
          transaction.id,
          entry.accountId,
          entry.amount,
          entry.direction,
        );
      }
    });
  }
}

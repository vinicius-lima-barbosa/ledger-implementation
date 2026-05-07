import { DatabaseSync } from "node:sqlite";

export class SQLiteDatabase {
  private db: DatabaseSync;

  constructor(filename: string = ":memory:") {
    this.db = new DatabaseSync(filename);
    this.initializeSchema();
  }

  private initializeSchema(): void {
    const createAccountsTable = `
      CREATE TABLE IF NOT EXISTS accounts (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT,
        direction TEXT NOT NULL CHECK(direction IN ('debit', 'credit'))
      );
    `;

    const createTransactionsTable = `
      CREATE TABLE IF NOT EXISTS transactions (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT
      );
    `;

    const createEntriesTable = `
      CREATE TABLE IF NOT EXISTS entries (
        id TEXT NOT NULL PRIMARY KEY,
        transaction_id TEXT NOT NULL,
        account_id TEXT NOT NULL,
        amount REAL NOT NULL,
        direction TEXT NOT NULL CHECK(direction IN ('debit', 'credit')),
        FOREIGN KEY (transaction_id) REFERENCES transactions (id),
        FOREIGN KEY (account_id) REFERENCES accounts (id)
      );
    `;

    this.db.exec(createAccountsTable);
    this.db.exec(createTransactionsTable);
    this.db.exec(createEntriesTable);
  }

  close(): void {
    this.db.close();
  }

  exec(sql: string): void {
    this.db.exec(sql);
  }

  get connection(): DatabaseSync {
    return this.db;
  }
}

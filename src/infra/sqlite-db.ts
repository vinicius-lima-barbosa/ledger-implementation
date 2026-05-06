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
        DIRECTION TEXT NOT NULL CHECK(DIRECTION IN ('debit', 'credit'))
      );
    `;

    this.db.exec(createAccountsTable);
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

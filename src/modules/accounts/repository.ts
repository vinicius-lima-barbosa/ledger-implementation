import type { SQLiteDatabase } from "../../infra/sqlite-db.js";
import type { IAccount } from "./types.js";

interface IAccountRepository {
  getById(id: string): Promise<IAccount | null>;
  create(data: IAccount): Promise<IAccount>;
}

export class AccountsRepository implements IAccountRepository {
  constructor(private db: SQLiteDatabase) {}

  async getById(id: string): Promise<IAccount | null> {
    const stmt = this.db.connection.prepare(
      "SELECT * FROM accounts WHERE id = ?",
    );
    const row = stmt.get(id);

    if (!row) {
      return null;
    }

    const account = {
      id,
      name: row.name as string | null,
      direction: row.direction as "debit" | "credit",
    };

    return account;
  }

  async create(data: IAccount): Promise<IAccount> {
    const stmt = this.db.connection.prepare(
      "INSERT INTO accounts (id, name, direction) VALUES (?, ?, ?)",
    );

    stmt.run(data.id, data.name, data.direction);

    return {
      id: data.id,
      name: data.name,
      direction: data.direction,
    };
  }
}

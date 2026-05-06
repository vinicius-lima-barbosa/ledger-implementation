import type { SQLiteDatabase } from "../../infra/sqlite-db.js";
import type { IAccount } from "./types.js";

interface IAccountRepository {
  getAll(): Promise<IAccount[]>;
}

export class AccountsRepository implements IAccountRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll(): Promise<IAccount[]> {
    const stmt = this.db.connection.prepare(
      "SELECT * FROM accounts ORDER BY name",
    );
    const rows = stmt.all() as any[];

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      direction: row.direction,
    }));
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

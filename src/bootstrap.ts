import express from "express";
import { SQLiteDatabase } from "./infra/sqlite-db.js";
import { AccountsModule } from "./modules/accounts/module.js";
import { TransactionsModule } from "./modules/transactions/module.js";

export class Bootstrap {
  public app;

  constructor() {
    this.app = express();
  }

  private setupRoutes(db: SQLiteDatabase) {
    AccountsModule(this.app, db);
    TransactionsModule(this.app, db);
  }

  public init() {
    const db = new SQLiteDatabase("ledger.db");

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.setupRoutes(db);

    this.app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  }
}

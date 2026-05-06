import type { Express } from "express";
import type { SQLiteDatabase } from "../../infra/sqlite-db.js";
import { AccountsHttp } from "./http.js";
import { AccountsRepository } from "./repository.js";
import { AccountsRoutes } from "./routes.js";
import { AccountsService } from "./service.js";

export function AccountsModule(app: Express, db: SQLiteDatabase) {
  const repository = new AccountsRepository(db);
  const service = new AccountsService(repository);
  const http = new AccountsHttp(service);
  const routes = new AccountsRoutes(http);

  app.use("/accounts", routes.router);
  routes.register();
}

import type { Express } from "express";
import type { SQLiteDatabase } from "../../infra/sqlite-db.js";
import { TransactionsHttp } from "./http.js";
import { TransactionsRepository } from "./repository.js";
import { TransactionsRoutes } from "./routes.js";
import { TransactionsService } from "./service.js";

export function TransactionsModule(app: Express, db: SQLiteDatabase) {
  const repository = new TransactionsRepository(db);
  const service = new TransactionsService(repository);
  const http = new TransactionsHttp(service);
  const routes = new TransactionsRoutes(http);

  app.use("/transactions", routes.router);
  routes.register();
}

import { Router } from "express";
import { schemaValidation } from "../../shared/schema-validation.js";
import { createTransactionDto } from "./dto.js";
import type { TransactionsHttp } from "./http.js";

export class TransactionsRoutes {
  public router;

  constructor(private readonly transactionsHttp: TransactionsHttp) {
    this.router = Router();
  }

  register() {
    this.router.post(
      "/",
      schemaValidation(createTransactionDto),
      this.transactionsHttp.createTransaction.bind(this.transactionsHttp),
    );
  }
}

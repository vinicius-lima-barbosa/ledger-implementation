import { Router } from "express";
import { schemaValidation } from "../../shared/schema-validation.js";
import { createAccountsDto } from "./dto.js";
import type { AccountsHttp } from "./http.js";

export class AccountsRoutes {
  public router;

  constructor(private readonly accountsHttp: AccountsHttp) {
    this.router = Router();
  }

  register() {
    this.router.get("/:id", this.accountsHttp.getById.bind(this.accountsHttp));

    this.router.post(
      "/",
      schemaValidation(createAccountsDto),
      this.accountsHttp.createAccount.bind(this.accountsHttp),
    );
  }
}

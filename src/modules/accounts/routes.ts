import { Router } from "express";
import type { AccountsHttp } from "./http.js";

export class AccountsRoutes {
  public router;

  constructor(private readonly accountsHttp: AccountsHttp) {
    this.router = Router();
  }

  register() {
    this.router.get(
      "/",
      this.accountsHttp.getAllAccounts.bind(this.accountsHttp),
    );
  }
}

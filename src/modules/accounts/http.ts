import type { Request, Response } from "express";
import type { AccountsService } from "./service.js";

export class AccountsHttp {
  constructor(private readonly accountsService: AccountsService) {}

  async getAllAccounts(_req: Request, res: Response) {
    try {
      const accounts = await this.accountsService.getAllAccounts();
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  }
}

import type { Request, Response } from "express";
import type { TCreateAccounts } from "./dto.js";
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

  async createAccount(req: Request, res: Response) {
    try {
      const validatedData = req.validatedBody;
      if (!validatedData) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const account = await this.accountsService.create(
        validatedData as TCreateAccounts,
      );
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ error: "Failed to create account" });
    }
  }
}

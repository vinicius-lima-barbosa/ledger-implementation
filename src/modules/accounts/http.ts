import type { Request, Response } from "express";
import type { TCreateAccounts } from "./dto.js";
import type { AccountsService } from "./service.js";

export class AccountsHttp {
  constructor(private readonly accountsService: AccountsService) {}

  async getAll(req: Request, res: Response) {
    try {
      const accounts = await this.accountsService.getAllAccounts();
      if (accounts.length === 0) {
        return res.status(404).json({ error: "No accounts found" });
      }

      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch accounts" });
    }
  }

  async getById(req: Request<{ id: string }>, res: Response) {
    try {
      const id = req.params?.id;
      if (!id) {
        return res.status(400).json({ error: "Account ID is required" });
      }

      const account = await this.accountsService.getAccountById(id);
      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }
      res.status(200).json(account);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch account" });
    }
  }

  async createAccount(req: Request, res: Response) {
    try {
      const validatedData = req.validatedBody as TCreateAccounts | undefined;
      if (!validatedData) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const account = await this.accountsService.create(validatedData);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ error: "Failed to create account" });
    }
  }
}

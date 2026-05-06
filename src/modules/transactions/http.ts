import type { Request, Response } from "express";
import type { TCreateTransaction } from "./dto.js";
import type { TransactionsService } from "./service.js";

export class TransactionsHttp {
  constructor(private readonly transactionsService: TransactionsService) {}

  async createTransaction(req: Request, res: Response) {
    try {
      const validatedData = req.validatedBody as TCreateTransaction | undefined;
      if (!validatedData) {
        return res.status(400).json({ error: "Invalid request body" });
      }

      const transaction =
        await this.transactionsService.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

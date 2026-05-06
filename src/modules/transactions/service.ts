import type { TCreateTransaction } from "./dto.js";
import type { TransactionsRepository } from "./repository.js";
import type { ITransactionWithEntries } from "./types.js";

export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async createTransaction(
    data: TCreateTransaction,
  ): Promise<ITransactionWithEntries> {
    const createTransactionPayload = {
      id: data.id ? data.id : crypto.randomUUID(),
      name: data.name ? data.name : null,
    };

    const transaction = await this.transactionsRepository.createTransaction(
      createTransactionPayload,
    );
    if (!transaction) {
      throw new Error("Failed to create transaction");
    }

    const entriesPayload = data.entries.map((entry) => ({
      id: crypto.randomUUID(),
      accountId: entry.accountId,
      amount: entry.amount,
      direction: entry.direction,
    }));

    const entries = await this.transactionsRepository.saveEntries(
      transaction.id,
      entriesPayload,
    );

    return {
      ...transaction,
      entries,
    };
  }
}

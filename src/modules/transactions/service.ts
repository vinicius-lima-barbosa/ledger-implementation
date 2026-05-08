import type { TCreateTransaction } from "./dto.js";
import * as mapper from "./mapper.js";
import { toTransactionWithEntries } from "./mapper.js";
import type { TransactionsRepository } from "./repository.js";
import type { ITransactionWithEntries } from "./types.js";

export class TransactionsService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  async createTransaction(
    data: TCreateTransaction,
  ): Promise<ITransactionWithEntries> {
    const transaction = mapper.toTransaction(data);

    await this.transactionsRepository.create(transaction);

    return toTransactionWithEntries(transaction, transaction.entries);
  }
}

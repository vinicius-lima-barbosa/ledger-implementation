import { calculateBalance } from "../../shared/calculate-balance.js";
import type { TCreateAccounts } from "./dto.js";
import { toAccountWithBalance } from "./mapper.js";
import type { AccountsRepository } from "./repository.js";
import type { IAccountWithBalance } from "./types.js";

export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async getAllAccounts(): Promise<IAccountWithBalance[]> {
    const accounts = await this.accountsRepository.getAll();
    return Promise.all(
      accounts.map(async (account) => {
        const entries = await this.accountsRepository.getEntriesByAccountId(
          account.id,
        );

        const balance = calculateBalance(entries, account.direction);

        return toAccountWithBalance(account, balance);
      }),
    );
  }

  async getAccountById(id: string): Promise<IAccountWithBalance | null> {
    const account = await this.accountsRepository.getById(id);
    if (!account) {
      return null;
    }

    const entries = await this.accountsRepository.getEntriesByAccountId(id);

    const balance = calculateBalance(entries, account.direction);

    return toAccountWithBalance(account, balance);
  }

  async create(data: TCreateAccounts): Promise<IAccountWithBalance> {
    const payload = {
      id: data.id ? data.id : crypto.randomUUID(),
      name: data.name ? data.name : null,
      direction: data.direction,
    };

    const account = await this.accountsRepository.create(payload);
    return toAccountWithBalance(account, 0);
  }
}

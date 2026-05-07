import type { TCreateAccounts } from "./dto.js";
import { toAccountWithBalance } from "./mapper.js";
import type { AccountsRepository } from "./repository.js";
import type { IAccountWithBalance } from "./types.js";

export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  async getAllAccounts(): Promise<IAccountWithBalance[]> {
    const accounts = await this.accountsRepository.getAll();
    return accounts.map((account) => toAccountWithBalance(account, 0));
  }

  async getAccountById(id: string): Promise<IAccountWithBalance | null> {
    const account = await this.accountsRepository.getById(id);
    if (!account) {
      return null;
    }

    return toAccountWithBalance(account, 0);
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

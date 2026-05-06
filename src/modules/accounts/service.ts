import type { AccountsRepository } from "./repository.js";

export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  getAllAccounts() {
    return this.accountsRepository.getAll();
  }
}

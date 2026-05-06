import type { TCreateAccounts } from "./dto.js";
import type { AccountsRepository } from "./repository.js";

export class AccountsService {
  constructor(private readonly accountsRepository: AccountsRepository) {}

  getAllAccounts() {
    return this.accountsRepository.getAll();
  }

  create(data: TCreateAccounts) {
    const payload = {
      id: data.id ? data.id : crypto.randomUUID(),
      name: data.name ? data.name : null,
      direction: data.direction,
    };

    return this.accountsRepository.create(payload);
  }
}

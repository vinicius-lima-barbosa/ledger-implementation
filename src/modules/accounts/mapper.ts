import type { IAccount, IAccountWithBalance } from "./types.js";

export function toAccountWithBalance(
  account: IAccount,
  balance: number,
): IAccountWithBalance {
  return {
    ...account,
    balance,
  };
}

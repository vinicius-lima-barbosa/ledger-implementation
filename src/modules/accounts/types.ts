export interface IAccount {
  id: string;
  name: string;
  direction: "debit" | "credit";
}

export interface IAccountWithBalance extends IAccount {
  balance: number;
}

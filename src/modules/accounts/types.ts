export interface IAccount {
  id: string;
  name: string | null;
  direction: "debit" | "credit";
}

export interface IAccountWithBalance extends IAccount {
  balance: number;
}

export interface ITransaction {
  id: string;
  name: string | null;
}

export interface IEntry {
  id: string;
  accountId: string;
  amount: number;
  direction: "debit" | "credit";
}

export interface ITransactionWithEntries extends ITransaction {
  entries: IEntry[];
}

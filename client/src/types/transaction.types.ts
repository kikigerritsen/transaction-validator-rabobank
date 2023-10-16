export interface ITransactionObject {
  json: ITransactionType[];
  tableType: "nonUniqueReferences" | "invalidBalances";
}

export interface ITransactionType {
  reference: number;
  accountNumber: string;
  description?: string;
  startBalance: number;
  mutation: number;
  mutationType: "+" | "-";
  endBalance: number;
}

export interface IJsonResponse {
  nonUniqueReferences: ITransactionType[];
  invalidBalances: ITransactionType[];
}

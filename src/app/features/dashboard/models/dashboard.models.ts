export interface Balance{
  accountNumber: string;
  balance: number;
  customerName: string;
}

export interface Transaction{
  id: number;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  dateTime: string;
}

export interface TransactionRequest{
  accountNumber: string;
  type: 'CREDIT'|'DEBIT';
  amount: number;
}


export interface DepositRequest{
  accountNumber: string;
  amount: number;
}

export interface DepositResponse{
  message: string;
  newBalance: number;
}

export interface TransferRequest{
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  type: 'CREDIT' | 'DEBIT';
}

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

export interface TransferResponse {
  transactionId: string;
  dateTime: string;
  fromAccount: {
    accountNumber: string;
    remainingBalance: number;
    remainingCredit: number;
  };
  toAccount: {
    accountNumber: string;
    newBalance: number;
  };
  amount: number;
 }

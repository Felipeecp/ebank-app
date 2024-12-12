export interface AccountLimits {
  accountNumber: string;
  balance: number;
  creditLimit: number;
  availableCredit: number;
  totalAvailable: number;
 }

export interface Statement{
  accountNumber: string;
  customerName: string;
  currentBalance: number;
  transactions: StatementTransaction[];
}

export interface StatementTransaction{
  type: 'DEPOSIT' | 'TRANSFER_DEBIT' | 'TRANSFER_CREDIT' | 'TRANSFER_RECEIVED';
  amount: number;
  dateTime: string;
  description: string;
  relatedAccountNumber: string | null;
}

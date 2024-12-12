import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/enviroment';
import { Balance, DepositRequest, DepositResponse, Transaction, TransferRequest, TransferResponse } from '../models/transaction.models';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private readonly API_URL = `${environment.apiUrl}/transactions`;

  constructor(private http:HttpClient) { }

  getBalance(accountNumber: string): Observable<Balance> {
    console.log('Fazendo requisição para:', `${this.API_URL}/transactions/balance/${accountNumber}`);
    return this.http.get<Balance>(`${this.API_URL}/balance/${accountNumber}`)
      .pipe(
        tap({
          next: (response) => console.log('Resposta recebida:', response),
          error: (error) => console.error('Erro na requisição:', error)
        })
      );
  }

  getTransaction(accountNumber: string): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.API_URL}/${accountNumber}`);
  }

  deposit(data: DepositRequest): Observable<DepositResponse>{
    return this.http.post<DepositResponse>(`${this.API_URL}/deposit`, data)
  }

  transfer(data: TransferRequest): Observable<TransferResponse>{
    return this.http.post<TransferResponse>(`${this.API_URL}/transfer`,data)
  }

}

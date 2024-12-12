import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/enviroment';
import { Balance, Transaction, TransactionRequest } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = environment.apiUrl

  constructor(private http: HttpClient){}

  getBalance(accountNumber: string): Observable<Balance> {
    console.log('Fazendo requisição para:', `${this.API_URL}/transactions/balance/${accountNumber}`);
    return this.http.get<Balance>(`${this.API_URL}/transactions/balance/${accountNumber}`)
      .pipe(
        tap({
          next: (response) => console.log('Resposta recebida:', response),
          error: (error) => console.error('Erro na requisição:', error)
        })
      );
  }

  getTransaction(accountNumber: string): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions/${accountNumber}`);
  }

  createTransaction(transaction: TransactionRequest): Observable<void>{
    return this.http.post<void>(`${this.API_URL}/transactions`, transaction);
  }
}

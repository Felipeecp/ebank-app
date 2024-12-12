import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.development';
import { Observable } from 'rxjs';
import { AccountLimits, Statement } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly API_URL = `${environment.NG_APP_API_URL}/accounts`;

  constructor(private http: HttpClient){}

  getAccountLimits(accountNumber: string): Observable<AccountLimits>{
    return this.http.get<AccountLimits>(`${this.API_URL}/${accountNumber}/limits`);
  }

  updateCreditLimit(accountNumber: string, newCreditLimit: number): Observable<any>{
    return this.http.put(`${this.API_URL}/credit-limit`,{
      accountNumber,
      newCreditLimit
    });
  }

  getAvailableAccounts():Observable<any[]>{
    return this.http.get<any[]>(`${this.API_URL}/available`)
  }

  getStatement(
    accountNumber: string,
    startDate?: string,
    endDate?: string
  ): Observable<Statement>{
    let params = new HttpParams();
    if(startDate){
      params = params.set('startDate', startDate);
    }
    if(endDate){
      params = params.set('endDate', endDate);
    }

    return this.http.get<Statement>(
      `${this.API_URL}/${accountNumber}/statement`,
      {params}
    );
  }
}

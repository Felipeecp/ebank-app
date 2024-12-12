import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthResponse, LoginCredentials, RegisterData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http:HttpClient, private router: Router) {
    const savedUser = localStorage.getItem("currentUser");
    if(savedUser){
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
   }

   login(credentials: LoginCredentials): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.API_URL}/login`,credentials)
    .pipe(
      tap(response=>{
        localStorage.setItem(`currentUser`,JSON.stringify(response));
        this.currentUserSubject.next(response)
      })
    );
   }

   register(userData: RegisterData):Observable<void>{
    return this.http.post<void>(`${this.API_URL}/register`, userData)
   }

   logout(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login'])
   }

   isAuthenticated(): boolean{
    return !!this.currentUserSubject.value;
   }

   getAuthToken(): string | null{
    return this.currentUserSubject.value?.token || null;
  }

  getCurrentUser(): AuthResponse|null {
    return this.currentUserSubject.value;
  }

  getCurrentUser$(): Observable<AuthResponse | null> {
    return this.currentUser$;
  }
}

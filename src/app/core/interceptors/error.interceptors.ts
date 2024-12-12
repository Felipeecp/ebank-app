// src/app/core/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (error.error instanceof ErrorEvent) {
          // Erro do cliente
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status === 0) {
          // Erro de conexão/CORS
          errorMessage = 'Erro de conexão com o servidor. Verifique se a API está rodando.';
        } else {
          // Erro do backend
          errorMessage = `Erro ${error.status}: ${error.error?.message || error.message}`;
        }

        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000
        });

        console.error('Detalhes do erro:', error);
        return throwError(() => error);
      })
    );
  }
}

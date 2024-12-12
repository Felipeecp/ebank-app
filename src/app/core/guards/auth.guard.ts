import { inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AuthService } from "../../features/auth/service/auth.service";

export const authGuard = () => {
  const router = inject(Router);
  const authService = inject(AuthService)
  const snackBar = inject(MatSnackBar)

  if(authService.isAuthenticated()){
    return true;
  }

  snackBar.open('Você precisa estar logado para acessar esta página', 'Fechar', {
    duration: 5000
  });

  router.navigate(['/auth/login']);

  return false;
}

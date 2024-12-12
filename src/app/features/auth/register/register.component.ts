import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit():void{
    if(this.registerForm.valid){
      this.authService.register(this.registerForm.value).subscribe({
        next:()=>{
          this.snackBar.open("Registro realizado com sucesso!",'Fechar',{
            duration: 5000
          });
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Erro ao realizar registro',
            'Fechar',
            {duration: 5000}
          );
        }
      });
    }
  }
}

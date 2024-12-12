import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ){
    this.loginForm = this.fb.group({
      email: ['',[Validators.required, Validators.minLength(6)]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void{
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: ()=>{
          this.router.navigate(['/dashboard'])
        },
        error:(error)=>{
          this.snackBar.open(
            error.error?.message || 'Erro ao fazer login',
            'Fechar',
            {duration: 5000}
          );
        }
      });
    }
  }

}


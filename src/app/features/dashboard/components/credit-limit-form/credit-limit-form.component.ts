import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-credit-limit-form',
  templateUrl: './credit-limit-form.component.html',
  styleUrl: './credit-limit-form.component.scss'
})
export class CreditLimitFormComponent {
  @Input() accountNumber!: string;
  @Input() currentLimit: number = 0;
  @Output() limitUpdated = new EventEmitter<void>();

  creditLimitForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ){
    this.creditLimitForm = this.fb.group({
      newCreditLimit: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.creditLimitForm.valid) {
      this.isLoading = true;
      this.dashboardService.updateCreditLimit(
        this.accountNumber,
        this.creditLimitForm.value.newCreditLimit
      ).subscribe({
        next: () => {
          this.limitUpdated.emit();
          this.creditLimitForm.reset();
          this.snackBar.open('Limite de crédito atualizado com sucesso!', 'Fechar', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Erro ao atualizar limite de crédito',
            'Fechar',
            { duration: 5000 }
          );
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

}

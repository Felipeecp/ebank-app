import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-deposit-form',
  templateUrl: './deposit-form.component.html',
  styleUrl: './deposit-form.component.scss'
})
export class DepositFormComponent {
  @Input() accountNumber!: string;
  @Output() depositSuccess = new EventEmitter<number>();

  depositForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ){
    this.depositForm = this.fb.group({
      amount: ['', [Validators.required, Validators.min(10.00)]]
    });
  }

  onSubmit():void{
    if(this.depositForm.valid){
      this.isLoading = true;
      const request = {
        accountNumber: this.accountNumber,
        amount: this.depositForm.value.amount
      };

      this.transactionService.deposit(request).subscribe({
        next: (response) => {
          this.snackBar.open(response.message, 'Fechar', {
            duration: 3000
          });
          this.depositSuccess.emit(response.newBalance);
          this.depositForm.reset();
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Erro ao realizar depósito',
            'Fechar',
            {duration:5000}
          );
        },
        complete: () => {
          this.isLoading = false;
        }
      });
    }
  }

}

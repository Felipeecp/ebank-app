import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {
  @Input() accountNumber!: string;
  transactionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ){
    this.transactionForm = this.fb.group({
      type:['',Validators.required],
      amount:['',[Validators.required, Validators.min(0.01)]]
    });
  }

  onSubmit():void{
    if(this.transactionForm.valid){
      const transaction = {
        accountNumber: this.accountNumber,
        ...this.transactionForm.value
      };

      this.dashboardService.createTransaction(transaction).subscribe({
        next: ()=>{
          this.snackBar.open('Transação realizada com sucesso!','Fechar',{
            duration:3000
          });
          this.transactionForm.reset();
        },
        error: (error)=>{
          this.snackBar.open(
            error.error?.message || 'Erro ao realizar transação',
            'Fechar',
            {duration:5000}
          );
        }
      });
    }
  }


}

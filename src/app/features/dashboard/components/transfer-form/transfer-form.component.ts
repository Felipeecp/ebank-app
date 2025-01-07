import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../../service/transaction.service';
import { DashboardService } from '../../service/dashboard.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransferRequest } from '../../models/transaction.models';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.scss'
})
export class TransferFormComponent implements OnInit {
  @Input() accountNumber!: string;
  @Input() availableBalance: number = 0;
  @Input() availableCredit: number = 0;
  @Output() transferSuccess = new EventEmitter<void>();

  transferForm: FormGroup;
  availableAccounts: any[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar
  ){
    this.transferForm = this.fb.group({
      toAccountNumber: ['',Validators.required],
      type: ['DEBIT', Validators.required],
      amount: ['',[
        Validators.required,
        Validators.min(0.01),
        Validators.max(this.availableBalance)
        ]
      ]
    });
  }

  ngOnInit(): void {
    this.loadAvailableAccounts();
    this.setupAmountValidation();
  }

  private loadAvailableAccounts():void {
    this.dashboardService.getAvailableAccounts()
    .subscribe({
      next: (accounts) => {
        this.availableAccounts = accounts.filter(
          acc => acc.accountNumber !== this.accountNumber
        );
      },
      error:(error)=>{
        this.snackBar.open("Erro ao carregar contas disponiveis","Fechar",{
          duration: 5000
        });
      }
    })
  }

  private setupAmountValidation(): void {
    this.transferForm.get('type')?.valueChanges.subscribe(type=>{
      const maxAmount = type === 'DEBIT' ? this.availableBalance : this.availableCredit;
      this.transferForm.get('amount')?.setValidators([
        Validators.required,
        Validators.min(0.01),
        Validators.max(maxAmount)
      ]);
      this.transferForm.get('amount')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      this.isLoading = true;
      const request : TransferRequest = {
        fromAccountNumber: this.accountNumber,
        toAccountNumber: this.transferForm.value.toAccountNumber,
        amount: this.transferForm.value.amount,
        type: this.transferForm.value.type
      }
      this.transactionService.transfer(
        request
      ).subscribe({
        next: () => {
          this.transferSuccess.emit();
          this.transferForm.reset({ type: 'DEBIT' });
          this.snackBar.open('Transferência realizada com sucesso!', 'Fechar', {
            duration: 3000
          });
        },
        error: (error) => {
          this.snackBar.open(
            error.error?.message || 'Erro ao realizar transferência',
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

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { AccountLimits } from '../../models/dashboard.models';
import { DashboardService } from '../../service/dashboard.service';
import { TransactionService } from '../../service/transaction.service';
import { RecentStatementComponent } from '../recent-statement/recent-statement.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  accountNumber: string = '';
  accountLimits?: AccountLimits;
  recentTransactions: any[] = [];
  @ViewChild(RecentStatementComponent) recentStatement!: RecentStatementComponent;

  constructor(
    private dialog: MatDialog,
    public authService: AuthService,
    private dashboardService: DashboardService,
    private transactionService: TransactionService,
    private snackBar: MatSnackBar
  ) {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.accountNumber) {
      this.accountNumber = currentUser.accountNumber;
    }
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  async loadDashboardData(): Promise<void> {
    try {
      await Promise.all([
        this.loadAccountLimits(),
        this.loadRecentTransactions()
      ]);
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
      this.snackBar.open('Erro ao carregar dados do dashboard', 'Fechar', {
        duration: 5000
      });
    }
  }
  private async loadAccountLimits(): Promise<void> {
    try{
      this.accountLimits = await firstValueFrom(
        this.dashboardService.getAccountLimits(this.accountNumber)
      );
    }catch(error){
      this.snackBar.open('Erro ao carregar limites da conta','Fechar',{
        duration: 5000
      });
      throw error;
    }
  }

  private async loadRecentTransactions(): Promise<void>{
    try{
      const transaction = await firstValueFrom(
        this.transactionService.getTransaction(this.accountNumber)
      );
      this.recentTransactions = transaction.slice(0,5);
    }catch(error){
      this.snackBar.open(`Erro ao carregar transações`, 'Fechar',{
        duration:5000
      });
      throw error;
    }
  }

  onDepositSuccess(newBalance: number){
    this.loadDashboardData();
    this.recentStatement.loadStatement();
    this.snackBar.open("Depósito realizado com sucesso!","Fechar",{
      duration: 3000
    })
  }

  onTransferSuccess():void{
    this.loadDashboardData();
    this.recentStatement.loadStatement();
    this.snackBar.open("Transferência realizada com sucesso!","Fechar",{
      duration: 3000
    })
  }

  onCreditLimitUpdate(): void {
    this.loadDashboardData();
    this.snackBar.open('Limite de crédito atualizado com sucesso!', 'Fechar', {
      duration: 3000
    });
  }

}

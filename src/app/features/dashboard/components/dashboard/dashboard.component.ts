import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../auth/auth.service';
import { TransactionListDialogComponent } from '../transaction-list-dialog/transaction-list-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  accountNumber: string;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService
  ){
    this.accountNumber = this.authService.getCurrentUser()?.accountNumber || '';
  }

  openTransactionList():void{
    this.dialog.open(TransactionListDialogComponent, {
      width:'800px',
      data: {accountNumber: this.accountNumber}
    });
  }

}

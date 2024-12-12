import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionListDialogComponent } from './components/transaction-list-dialog/transaction-list-dialog.component';
import { BalanceCardComponent } from './components/balance-card/balance-card.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TransactionListDialogComponent,
    BalanceCardComponent,
    RecentTransactionsComponent,
    TransactionFormComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule
  ],
  exports:[
    TransactionListDialogComponent
  ]
})
export class DashboardModule { }

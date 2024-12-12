import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreditLimitFormComponent } from './components/credit-limit-form/credit-limit-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DepositFormComponent } from './components/deposit-form/deposit-form.component';
import { FullStatementDialogComponent } from './components/full-statement-dialog/full-statement-dialog.component';
import { RecentStatementComponent } from './components/recent-statement/recent-statement.component';
import { TransferFormComponent } from './components/transfer-form/transfer-form.component';
import { DashboardRoutingModule } from './dashboard-routing.module';


@NgModule({
  declarations: [
    DashboardComponent,
    DepositFormComponent,
    TransferFormComponent,
    CreditLimitFormComponent,
    RecentStatementComponent,
    FullStatementDialogComponent,
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
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class DashboardModule { }

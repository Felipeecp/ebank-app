import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Statement, StatementTransaction } from '../../models/dashboard.models';
import { DashboardService } from '../../service/dashboard.service';
import { FullStatementDialogComponent } from '../full-statement-dialog/full-statement-dialog.component';

@Component({
  selector: 'app-recent-statement',
  templateUrl: './recent-statement.component.html',
  styleUrl: './recent-statement.component.scss'
})
export class RecentStatementComponent {
  @Input() accountNumber!: string;
  statement?: Statement;
  recentTransactions: StatementTransaction[] = [];
  displayedColumns: string[] = ['dateTime', 'type', 'amount', 'description'];
  isLoading = true;

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStatement();
  }

  loadStatement() {
    this.isLoading=true;
    this.dashboardService.getStatement(this.accountNumber)
    .subscribe({
      next: (statement) => {
        this.statement = statement;
        this.recentTransactions = statement?.transactions?.slice(0, 5) || [];
      },
      error: (error) => {
        console.error('Erro ao carregar extrato:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  openFullStatement(): void {
    this.dialog.open(FullStatementDialogComponent,{
      width: '900px',
      data: {accountNumber: this.accountNumber}
    })
  }
}

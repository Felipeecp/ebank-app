import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '../../models/dashboard.models';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent implements OnInit {
  @Input() accountNumber!: string;
  transactions: Transaction[] = [];
  displayedColumns: string[] = ['dateTime', 'type', 'amount'];

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions():void{
    this.dashboardService.getTransaction(this.accountNumber)
    .subscribe(transactions=>{
      this.transactions = transactions.slice(0,5);
    });
  }
}

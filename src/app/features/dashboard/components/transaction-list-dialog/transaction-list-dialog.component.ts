import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from '../../models/dashboard.models';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-transaction-list-dialog',
  templateUrl: './transaction-list-dialog.component.html',
  styleUrl: './transaction-list-dialog.component.scss'
})
export class TransactionListDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['dateTime', 'type', 'amount'];
  dataSource = new MatTableDataSource<Transaction>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {accountNumber: string},
    private dashboardService: DashboardService
  ){}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions():void{
    this.dashboardService.getTransaction(this.data.accountNumber)
    .subscribe(transactions=>{
      this.dataSource.data = transactions;
      this.dataSource.paginator = this.paginator
    });
  }
}

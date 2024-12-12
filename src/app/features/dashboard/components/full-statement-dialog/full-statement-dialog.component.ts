import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Statement, StatementTransaction } from '../../models/dashboard.models';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-full-statement-dialog',
  templateUrl: './full-statement-dialog.component.html',
  styleUrl: './full-statement-dialog.component.scss'
})
export class FullStatementDialogComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator

  statement?: Statement;
  dataSource: MatTableDataSource<StatementTransaction>;
  displayedColumns: string[] = ['dateTime','type','amount','description'];
  filterForm: FormGroup;
  isLoading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {accountNumber: string},
    private dashboardService: DashboardService,
    private fb: FormBuilder
  ){
    this.dataSource = new MatTableDataSource<StatementTransaction>([]);
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {
    this.loadStatement();
    this.setupFilters();
  }

  private setupFilters():void{
    this.filterForm.valueChanges.subscribe(()=>{
      this.loadStatement();
    })
  }

  loadStatement(): void{
    this.isLoading = true;
    const values = this.filterForm.value;
    const startDate = this.formatDate(values.startDate);
    const endDate = this.formatDate(values.endDate);

    this.dashboardService.getStatement(
      this.data.accountNumber,
      startDate,
      endDate
    ).subscribe({
      next: statement => {
        this.statement = statement;
        this.dataSource.data = statement.transactions;
        this.dataSource.paginator = this.paginator;
      },
      error: error => {
        console.error('Erro ao carregar extrato:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private formatDate(date: Date | null): string | undefined {
    if (!date) return undefined;
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T00:00:00`;
  }
}

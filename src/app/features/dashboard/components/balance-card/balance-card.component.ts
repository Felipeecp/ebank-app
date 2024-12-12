import { Component, Input, OnInit } from '@angular/core';
import { Balance } from '../../models/dashboard.models';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-balance-card',
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.scss'
})
export class BalanceCardComponent implements OnInit{
  @Input() accountNumber!: string;
  balance: Balance | null = null;

  constructor(private dashboardService: DashboardService){}

  ngOnInit(): void {
      this.loadBalance();
  }

  loadBalance(): void{
    this.dashboardService.getBalance(this.accountNumber).subscribe(balance => this.balance = balance)
  }
}

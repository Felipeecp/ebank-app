import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentStatementComponent } from './recent-statement.component';

describe('RecentStatementComponent', () => {
  let component: RecentStatementComponent;
  let fixture: ComponentFixture<RecentStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentStatementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullStatementDialogComponent } from './full-statement-dialog.component';

describe('FullStatementDialogComponent', () => {
  let component: FullStatementDialogComponent;
  let fixture: ComponentFixture<FullStatementDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FullStatementDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullStatementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditLimitFormComponent } from './credit-limit-form.component';

describe('CreditLimitFormComponent', () => {
  let component: CreditLimitFormComponent;
  let fixture: ComponentFixture<CreditLimitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreditLimitFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreditLimitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

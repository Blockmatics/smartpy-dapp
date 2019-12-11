import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpenderAllowanceComponent } from './spender-allowance.component';

describe('SpenderAllowanceComponent', () => {
  let component: SpenderAllowanceComponent;
  let fixture: ComponentFixture<SpenderAllowanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpenderAllowanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpenderAllowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

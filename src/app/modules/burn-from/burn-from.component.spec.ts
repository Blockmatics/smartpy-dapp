import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurnFromComponent } from './burn-from.component';

describe('BurnFromComponent', () => {
  let component: BurnFromComponent;
  let fixture: ComponentFixture<BurnFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurnFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurnFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

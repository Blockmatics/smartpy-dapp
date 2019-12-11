import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferFromComponent } from './transfer-from.component';

describe('TransferFromComponent', () => {
  let component: TransferFromComponent;
  let fixture: ComponentFixture<TransferFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

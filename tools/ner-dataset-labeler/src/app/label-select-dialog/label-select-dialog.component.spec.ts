import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelSelectDialogComponent } from './label-select-dialog.component';

describe('LabelSelectDialogComponent', () => {
  let component: LabelSelectDialogComponent;
  let fixture: ComponentFixture<LabelSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

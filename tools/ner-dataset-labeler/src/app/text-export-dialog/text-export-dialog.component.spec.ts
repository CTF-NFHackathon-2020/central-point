import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextExportDialogComponent } from './text-export-dialog.component';

describe('TextExportDialogComponent', () => {
  let component: TextExportDialogComponent;
  let fixture: ComponentFixture<TextExportDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextExportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

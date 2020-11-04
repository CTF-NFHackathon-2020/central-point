import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentBadgeComponent } from './intent-badge.component';

describe('IntentBadgeComponent', () => {
  let component: IntentBadgeComponent;
  let fixture: ComponentFixture<IntentBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

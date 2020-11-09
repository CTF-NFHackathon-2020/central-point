import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { IntentBadgeComponent } from './intent-badge.component';

describe('IntentBadgeComponent', () => {
  let component: IntentBadgeComponent;
  let fixture: ComponentFixture<IntentBadgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot()],
      declarations: [ IntentBadgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentBadgeComponent);
    component = fixture.componentInstance;
    component.intent = {dialogState: 'ReadyForFulfillment', intentName: 'AddAnxietyLevel', message: 'Mesage', slots: {slot1: 'slot1text'}}
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

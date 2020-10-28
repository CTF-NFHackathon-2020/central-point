import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ChatbotState } from '../chatbot.state';

import { ChatDialogComponent } from './chat-dialog.component';

describe('ChatDialogComponent', () => {
  let component: ChatDialogComponent;
  let fixture: ComponentFixture<ChatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDialogComponent ],
      imports: [NgxsModule.forRoot([])]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

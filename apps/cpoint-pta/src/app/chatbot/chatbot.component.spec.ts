import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';

import { ChatbotComponent } from './chatbot.component';
import { ChatbotState } from './chatbot.state';
import { SpeechRecognitionService } from './speech-recognition.service';

describe('ChatbotComponent', () => {
  let component: ChatbotComponent;
  let fixture: ComponentFixture<ChatbotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatbotComponent,
        ChatDialogComponent,
        ChatHistoryComponent
      ],
      imports: [
        NgxsModule.forRoot([])
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a chat history', () => {
    expect(fixture.nativeElement.querySelector('app-chat-history')).toBeTruthy();
  });

  it('should contain a chat dialog input', () => {
    expect(fixture.nativeElement.querySelector('app-chat-dialog')).toBeTruthy();
  });
});

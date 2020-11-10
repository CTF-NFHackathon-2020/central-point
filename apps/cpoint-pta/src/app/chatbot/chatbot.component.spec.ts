import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxsSelectSnapshotModule } from '@ngxs-labs/select-snapshot';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../user/user.state';
import { AwsLexService } from './aws-lex.service';
import { ChatDialogComponent } from './chat-dialog/chat-dialog.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';

import { ChatbotComponent } from './chatbot.component';
import { ChatbotState } from './chatbot.state';
import { Gpt3Service } from './gpt3.service';
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
        NgxsModule.forRoot([ChatbotState, UserState]),
        NgxsSelectSnapshotModule
      ],
      providers: [
        { provide: AwsLexService, useValue: {} },
        { provide: Gpt3Service, useValue: {} },
        { provide: SpeechRecognitionService, useValue: {} }
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

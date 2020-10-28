import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ChatbotState } from './chatbot.state';
import { ChatbotActions } from './chatbot.actions';
import { SpeechRecognitionService } from './speech-recognition.service';

describe('Chatbot store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ChatbotState])],
      providers: [
        {provide: SpeechRecognitionService, useValue: () => {}}
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
  }));

  it('should update the dialog text', () => {
    store.dispatch(new ChatbotActions.UpdateDialogText('test text'));
    const dialogText = store.selectSnapshot(ChatbotState.dialogText);
    expect(dialogText).toEqual('test text');
  });

});

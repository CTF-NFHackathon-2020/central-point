import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ChatbotState } from './chatbot.state';
import { ChatbotActions } from './chatbot.actions';
import { SpeechRecognitionService } from './speech-recognition.service';
import { HttpClientModule } from '@angular/common/http';
import { AwsLexService } from './aws-lex.service';
import { LexIntent } from './lex.interface';
import { Gpt3Service } from './gpt3.service';
import { take } from 'rxjs/operators';

describe('Chatbot store', () => {
  let store: Store;
  let awsLex: AwsLexService;
  let gpt3: Gpt3Service;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([ChatbotState])],
      providers: [
        {provide: SpeechRecognitionService, useValue: () => {}}
      ]
    }).compileComponents();
    store = TestBed.inject(Store);
    awsLex = TestBed.inject(AwsLexService);
    gpt3 = TestBed.inject(Gpt3Service);
  }));

  it('should update the dialog text', () => {
    store.dispatch(new ChatbotActions.UpdateChatText('test text'));
    const dialogText = store.selectSnapshot(ChatbotState.chatText);
    expect(dialogText).toEqual('test text');
  });

  it('should recognize intents', async () => {
    const spy = spyOn(awsLex, 'detectIntent');
    const text = 'add pain level 10';
    store.dispatch(new ChatbotActions.DetectTextIntent(text));
    expect(spy).toHaveBeenCalledWith(text);
  });


  it('should retrieve chat response when a intent is not recognized', async () => {
    const spy = spyOn(gpt3, 'chat');
    const textRequest = 'hello there';

    awsLex.detectIntent = (text: string) => Promise.resolve({
      dialogState: 'ElicitIntent',
      message: 'Intent not recognized'} as LexIntent);

    await store.dispatch(new ChatbotActions.DetectTextIntent(textRequest)).pipe(take(1)).toPromise();
    expect(spy).toHaveBeenCalledWith(textRequest);
  });

});

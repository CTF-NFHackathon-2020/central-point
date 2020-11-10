import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext, NgxsOnInit } from '@ngxs/store';
import { take } from 'rxjs/operators';
import { AwsLexService } from './aws-lex.service';
import { ChatbotActions } from './chatbot.actions';
import { Gpt3Service } from './gpt3.service';
import { LexIntent} from './lex.interface';
import { SpeechRecognitionService } from './speech-recognition.service';

export interface ChatRecord {
  text: string;
  intent: LexIntent;
}
export interface ChatbotStateModel {
  chatText: string;
  chatHistory: ChatRecord[];
}

@Injectable()
@State<ChatbotStateModel>({
  name: 'chatbot',
  defaults: {
    chatText: '',
    chatHistory: [],
  }
})
export class ChatbotState {

  constructor(
    //private readonly speechService: SpeechRecognitionService,
    private readonly lex: AwsLexService,
    private readonly gpt3: Gpt3Service
    ) { }

  @Selector()
  public static chatText(state: ChatbotStateModel) {
    return state.chatText;
  }

  @Selector()
  public static chatHistory(state: ChatbotStateModel) {
    return state.chatHistory;
  }

  @Selector()
  public static chatHistoryByIndex(state: ChatbotStateModel, index: number) {
    return state.chatHistory[index];
  }

  @Selector()
  public static getState(state: ChatbotStateModel) {
    return state;
  }

  @Action(ChatbotActions.UpdateChatText)
  private updateChatText(ctx: StateContext<ChatbotStateModel>, action: ChatbotActions.UpdateChatText) {
    return ctx.patchState({chatText: action.text});
  }

  @Action(ChatbotActions.DetectTextIntent)
  private async detectTextIntent(ctx: StateContext<ChatbotStateModel>, action: ChatbotActions.DetectTextIntent) {
    const state = ctx.getState();
    if (action.text.length > 0) {
      const lexResponse = await this.lex.detectIntent(action.text);
      if (lexResponse.dialogState === 'ElicitIntent') {
        return ctx.dispatch(new ChatbotActions.ChatWithGPT3(action.text));
      }
      return ctx.setState({
        ...state,
        chatText: '',
        chatHistory: [...state.chatHistory, { text: action.text, intent: lexResponse }],
      });
    }
    return ctx.patchState({chatText: ''});
  }

  @Action(ChatbotActions.ChatWithGPT3)
  private async chatWithGPT3(ctx: StateContext<ChatbotStateModel>, action: ChatbotActions.ChatWithGPT3) {
    const state = ctx.getState();
    const gp3Response = await this.gpt3.chat(action.text).pipe(take(1)).toPromise();

    return ctx.setState({
      ...state,
      chatText: '',
      chatHistory: [
        ...state.chatHistory,
        {
          text: action.text,
          intent: {
            intentName: 'Chat',
            dialogState: 'ReadyForFulfillment',
            slots: undefined,
            message: gp3Response?.choices[0]?.text
          }}]
    });
  }
}
